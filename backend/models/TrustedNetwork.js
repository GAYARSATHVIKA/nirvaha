const mongoose = require('mongoose');

const trustedNetworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: 'Music'
  },
  image: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: ''
  },
  accent: {
    type: String,
    default: '#C4A35A'
  },
  accentDim: {
    type: String,
    default: 'rgba(196,163,90,0.15)'
  },
  sounds: [{
    id: String,
    label: String,
    icon: String,
    description: String,
    url: String
  }],
  displayOrder: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TrustedNetwork', trustedNetworkSchema);
