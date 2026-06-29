const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  content: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#ce93d8',
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

// Pre-save hook to generate slug if not provided, or ensure slug format
pageSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Page', pageSchema);
