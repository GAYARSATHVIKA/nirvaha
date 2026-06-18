const mongoose = require('mongoose');

const LandingSchema = new mongoose.Schema({
  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    imageUrl: { type: String, default: '' }
  },
  partners: [{ // Used for Stats
    name: String,
    logoUrl: String,
    websiteUrl: String,
    icon: String, // from legacy stats
    value: String, // from legacy stats
    label: String // from legacy stats
  }],
  pillars: [{ // Used for WhatIsNirvaha
    id: String,
    title: String,
    description: String,
    desc: String, // legacy map
    image: String, // legacy map
    order: Number
  }],
  library: [{
    title: String,
    category: String,
    duration: String,
    imageUrl: String,
    image: String, // legacy map
    story: String // from new format
  }],
  goals: [{ // Used for Ancient Wisdom
    id: Number,
    title: String,
    subtitle: String,
    description: String,
    desc: String, // legacy map
    imageUrl: String,
    image: String // legacy map
  }],
  academy: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    exploreButtonText: { type: String, default: '' },
    isLoginRequired: { type: Boolean, default: false }
  },
  courses: [{
    title: String,
    description: String,
    feeType: String,
    imageUrl: String,
    feel: String,
    bgColor: String,
    instructor: {
        name: String,
        title: String,
        experience: String,
        certifications: String,
        coursesHandled: String,
        expertise: String,
        socialLinks: String,
        website: String,
        rating: Number,
        reviewsCount: Number
    }
  }],
  settings: {
    maintenanceMode: { type: Boolean, default: false },
    showCollaborators: { type: Boolean, default: true },
    showContactForm: { type: Boolean, default: true }
  }
}, { 
  timestamps: true,
  // Ensure we only have one landing page document
  capped: false,
  strict: false 
});

module.exports = mongoose.model('Landing', LandingSchema);
