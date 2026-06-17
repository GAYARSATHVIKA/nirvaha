const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/auth');

/**
 * POST /api/enrollments/enroll
 * Enroll the authenticated user in a course
 */
router.post('/enroll', authenticateJWT, async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }

    const userId = req.user.id;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses && user.enrolledCourses.some(e => e.courseId === courseId);
    if (alreadyEnrolled) {
      return res.json({ success: true, message: 'Already enrolled', alreadyEnrolled: true });
    }

    // Add enrollment
    await User.findOneAndUpdate(
      { id: userId },
      { $push: { enrolledCourses: { courseId, enrolledAt: new Date() } } },
      { new: true }
    );

    res.json({ success: true, message: 'Enrolled successfully', courseId });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
});

/**
 * GET /api/enrollments/my-courses
 * Returns all course IDs the authenticated user is enrolled in
 */
router.get('/my-courses', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ id: userId }).select('enrolledCourses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const enrolledCourses = user.enrolledCourses || [];
    res.json({ success: true, enrolledCourses });
  } catch (err) {
    console.error('Get enrolled courses error:', err);
    res.status(500).json({ error: 'Server error fetching enrollments' });
  }
});

/**
 * GET /api/enrollments/status/:courseId
 * Check if the authenticated user is enrolled in a specific course
 */
router.get('/status/:courseId', authenticateJWT, async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const user = await User.findOne({ id: userId }).select('enrolledCourses');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isEnrolled = (user.enrolledCourses || []).some(e => e.courseId === courseId);
    res.json({ success: true, isEnrolled, courseId });
  } catch (err) {
    console.error('Enrollment status error:', err);
    res.status(500).json({ error: 'Server error checking enrollment status' });
  }
});

/**
 * POST /api/enrollments/apply
 * Submits an enrollment application for a course (Certification)
 */
router.post('/apply', async (req, res) => {
  try {
    const { courseId, courseTitle, name, email, phone, reason } = req.body;

    if (!courseId || !courseTitle || !name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Since authenticateJWT is not enforced here, check if user sent a token manually
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        userId = decoded.id;
      } catch (e) {
        // Ignore invalid token for application
      }
    }

    const Certification = require('../models/Certification');
    const course = await Certification.findOne({ id: courseId });
    const isFree = course ? course.isFree : false;

    let initialStatus = 'pending';
    if (isFree && userId) {
      initialStatus = 'approved';
      // Auto enroll the user
      await User.findOneAndUpdate(
        { id: userId },
        { $addToSet: { enrolledCourses: { courseId, enrolledAt: new Date(), completedUnits: [] } } }
      );
    }

    const EnrollmentApplication = require('../models/EnrollmentApplication');
    const application = new EnrollmentApplication({
      userId,
      courseId,
      courseTitle,
      name,
      email,
      phone,
      reason,
      status: initialStatus
    });

    await application.save();

    res.status(201).json({ success: true, message: 'Application submitted successfully', isFree, status: initialStatus });
  } catch (err) {
    console.error('Enrollment application error:', err);
    res.status(500).json({ error: 'Server error saving application' });
  }
});

/**
 * POST /api/enrollments/progress
 * Update progress (completed units) for an enrolled course
 */
router.post('/progress', authenticateJWT, async (req, res) => {
  try {
    const { courseId, unitId } = req.body;
    if (!courseId || !unitId) {
      return res.status(400).json({ error: 'courseId and unitId are required' });
    }

    const userId = req.user.id;
    
    // Find the user and update the specific enrolled course's completedUnits array
    const result = await User.findOneAndUpdate(
      { 
        id: userId, 
        'enrolledCourses.courseId': courseId 
      },
      { 
        $addToSet: { 'enrolledCourses.$.completedUnits': unitId } 
      },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Enrollment not found for this user' });
    }

    res.json({ success: true, message: 'Progress updated' });
  } catch (err) {
    console.error('Progress update error:', err);
    res.status(500).json({ error: 'Server error updating progress' });
  }
});

module.exports = router;

