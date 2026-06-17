const express = require('express');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Meditation = require('../models/Meditation');
const Sound = require('../models/Sound');

const router = express.Router();

// Get users for admin
router.get('/users', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('id name email role createdAt');

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const allBookings = await Booking.find();

    const activeSessions = allBookings.filter(
      (b) => {
        const typeLower = String(b.type || '').toLowerCase();
        const statusLower = String(b.status || '').toLowerCase();
        
        // Exclude products and retreats from being counted as active sessions
        if (typeLower === 'product' || typeLower === 'retreat') return false;
        
        // Include companion sessions, video/chat/audio sessions
        const isSession = typeLower.includes('session') || typeLower.includes('dive') || typeLower.includes('support') || ['video', 'chat', 'audio'].includes(typeLower);
        
        // Count upcoming, pending, in-progress, approved, and session confirmed as active
        const isActiveStatus = ['upcoming', 'pending', 'in-progress', 'session confirmed', 'pending approval', 'approved'].includes(statusLower);
        
        return isSession && isActiveStatus;
      }
    ).length;

    const totalBookings = allBookings.length;
    const revenue = allBookings.reduce((sum, booking) => {
      const statusLower = String(booking.status || '').toLowerCase();
      const paymentStatusLower = String(booking.paymentStatus || '').toLowerCase();
      
      // Revenue counts if session is approved/confirmed OR if payment is explicitly done
      const isApproved = ['approved', 'session confirmed', 'completed'].includes(statusLower);
      const isPaid = ['paid', 'completed', 'done', 'success'].includes(paymentStatusLower);

      if (isApproved || isPaid) {
        return sum + Number(booking.price || 0) * Number(booking.quantity || 1);
      }
      return sum;
    }, 0);
    const totalProducts = allBookings.filter((b) => String(b.type || '').toLowerCase() === 'product').length;
    const totalRetreats = allBookings.filter((b) => String(b.type || '').toLowerCase() === 'retreat').length;

    res.json({
      totalUsers,
      activeSessions,
      revenue,
      totalBookings,
      totalProducts,
      totalRetreats,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// --- Certifications Management ---

const Certification = require('../models/Certification');
const EnrollmentApplication = require('../models/EnrollmentApplication');
const nodemailer = require('nodemailer');

// Helper to get email transporter
async function getEmailTransporter() {
  // If no SMTP settings are provided, create an ethereal test account
  if (!process.env.SMTP_HOST) {
    let testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Use real credentials
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Get all certifications
router.get('/certifications', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new certification
router.post('/certifications', async (req, res) => {
  try {
    const { id, title, description, image, feel, cta, price, isFree, skillLevel, duration, certificate, modules } = req.body;
    if (!id || !title) return res.status(400).json({ error: 'id and title are required' });

    const newCert = new Certification({ id, title, description, image, feel, cta, price, isFree, skillLevel, duration, certificate, modules });
    await newCert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a certification
router.delete('/certifications/:id', async (req, res) => {
  try {
    await Certification.findOneAndDelete({ id: req.params.id });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a certification
router.put('/certifications/:id', async (req, res) => {
  try {
    const updated = await Certification.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Certification not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Enrollments Management ---

// Get all enrollment applications
router.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await EnrollmentApplication.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve an enrollment
router.post('/enrollments/:id/approve', async (req, res) => {
  try {
    const application = await EnrollmentApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });

    if (application.status === 'approved') {
      return res.status(400).json({ error: 'Already approved' });
    }

    application.status = 'approved';
    application.updatedAt = new Date();
    await application.save();

    // If there's a user associated, auto-enroll them in their User model
    if (application.userId) {
      await User.findOneAndUpdate(
        { id: application.userId },
        { $addToSet: { enrolledCourses: { courseId: application.courseId, enrolledAt: new Date() } } }
      );
    }

    // Send Approval Email
    try {
      const transporter = await getEmailTransporter();
      const info = await transporter.sendMail({
        from: '"Nirvaha Academy" <admissions@nirvaha.com>',
        to: application.email,
        subject: `Your Enrollment is Approved: ${application.courseTitle}`,
        text: `Hello ${application.name},\n\nCongratulations! Your application for "${application.courseTitle}" has been approved.\n\nPlease proceed to the payment gateway to complete your enrollment: https://payment.nirvaha.com/pay?course=${application.courseId}&user=${application._id}\n\nWelcome to Nirvaha Academy!`,
        html: `<h3>Hello ${application.name},</h3><p>Congratulations! Your application for <strong>${application.courseTitle}</strong> has been approved.</p><p><a href="https://payment.nirvaha.com/pay?course=${application.courseId}&user=${application._id}">Click here to complete your payment and enroll</a>.</p><p>Welcome to Nirvaha Academy!</p>`,
      });
      console.log("Approval email sent. Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (emailErr) {
      console.error("Failed to send approval email:", emailErr);
      // Still return success, but log the error
    }

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel an enrollment
router.post('/enrollments/:id/cancel', async (req, res) => {
  try {
    const application = await EnrollmentApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });

    application.status = 'cancelled';
    application.updatedAt = new Date();
    await application.save();

    // Optionally remove from user model if they were already approved
    if (application.userId) {
      await User.findOneAndUpdate(
        { id: application.userId },
        { $pull: { enrolledCourses: { courseId: application.courseId } } }
      );
    }

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;