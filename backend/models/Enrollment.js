const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const enrollmentSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4, unique: true },
    userId: { type: String, default: null },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: String, default: '' },
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    message: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
