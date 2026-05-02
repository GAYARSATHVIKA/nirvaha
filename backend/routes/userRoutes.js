const express = require('express');
const User = require('../models/User');
const router = express.Router();

const SEED_USERS = [
  { name: 'Sathvika G', email: 'sathvika@nirvaha.com', password: 'password123', role: 'admin' },
  { name: 'Arjun Mehta', email: 'arjun@example.com', password: 'password123', role: 'user' },
  { name: 'Priya Sharma', email: 'priya@example.com', password: 'password123', role: 'user' },
  { name: 'Rohan Das', email: 'rohan@example.com', password: 'password123', role: 'user' },
  { name: 'Kavya Nair', email: 'kavya@example.com', password: 'password123', role: 'user' },
];

async function seedUsersIfEmpty() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      // Use create to trigger any hooks or just insertMany
      await User.insertMany(SEED_USERS);
      console.log('✅ Seeded 5 sample users');
    }
  } catch (err) {
    console.error('Error seeding users:', err);
  }
}

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    await seedUsersIfEmpty();
    const limit = parseInt(req.query.limit) || 10;
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users/recent-users - Fetch top 5 recent users
router.get("/recent-users", async (req, res) => {
  try {
    await seedUsersIfEmpty();
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
