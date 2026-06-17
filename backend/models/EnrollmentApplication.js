const mongoose = require('mongoose');

const enrollmentApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Optional, for guests or future matching
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EnrollmentApplication', enrollmentApplicationSchema);
