const mongoose = require('mongoose');

const unitContentSchema = new mongoose.Schema({
  videoUrl: { type: String },
  audioUrl: { type: String },
  objectives: [{ type: String }],
  body: [{ type: String }],
  summary: { type: String },
  quizQuestions: [{
    question: String,
    options: [String],
    correct: Number
  }]
}, { _id: false });

const unitSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['reading', 'video', 'quiz', 'mindfulness', 'audio', 'reflection', 'activity'], default: 'reading' },
  xp: { type: Number, default: 50 },
  locked: { type: Boolean, default: false },
  duration: { type: String, default: '5 min' },
  content: { type: unitContentSchema, default: () => ({ objectives: [], body: [], summary: '' }) }
}, { _id: false });

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  units: [unitSchema]
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  feel: { type: String },
  cta: { type: String },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  bgColor: { type: String, default: 'bg-gradient-to-br from-[#f2f7eb] to-[#e6f0de]' },
  skillLevel: { type: String, default: 'Beginner' },
  duration: { type: String, default: 'Self-paced' },
  certificate: { type: String, default: 'Professional Certificate' },
  modules: [moduleSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certification', certificationSchema);
