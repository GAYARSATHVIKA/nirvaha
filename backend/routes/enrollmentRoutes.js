const express = require('express');
const Enrollment = require('../models/Enrollment');

const router = express.Router();

// POST /api/enrollments — submit enrollment
router.post('/', async (req, res) => {
  try {
    const { userId, userName, userEmail, phone, courseId, courseName, message } = req.body;
    if (!userName || !userEmail || !courseId || !courseName) {
      return res.status(400).json({ error: 'Name, email, courseId and courseName are required.' });
    }
    const enrollment = new Enrollment({ userId, userName, userEmail, phone, courseId, courseName, message });
    await enrollment.save();
    res.status(201).json({ success: true, enrollment });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enrollments — admin: all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enrollments/user/:userId — check if user is enrolled
router.get('/user/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.userId });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enrollments/:id/status — admin: update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const enrollment = await Enrollment.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
