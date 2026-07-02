const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  userName: { type: String, required: true },
  userAvatar: { type: String },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  userName: { type: String, required: true },
  userAvatar: { type: String },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String, ref: 'User' }],
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now }
});

const storySchema = new mongoose.Schema({
  authorId: { type: String, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorAvatar: { type: String },
  title: { type: String, required: true },
  quote: { type: String },
  trauma: { type: String }, // The Struggle
  nirvahaHelp: { type: String }, // Finding Nirvaha
  image: { type: String }, // Banner Image (base64 or URL)
  favorites: {
    chant: { type: String, default: '' },
    music: { type: String, default: '' },
    feature: { type: String, default: '' }
  },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
