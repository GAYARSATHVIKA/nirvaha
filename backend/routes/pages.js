const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

// ----------------------
// Public Routes
// ----------------------

// GET /api/pages
// Get all active pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find({ isActive: true }).select('title slug description color image createdAt');
    res.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ message: 'Failed to fetch pages' });
  }
});

// GET /api/pages/:slug
// Get a single active page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug, isActive: true });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ message: 'Failed to fetch page' });
  }
});

// ----------------------
// Admin Routes (Requires authentication and admin role)
// ----------------------

// GET /api/pages/admin/all
// Get all pages (including inactive)
router.get('/admin/all', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    console.error('Error fetching admin pages:', error);
    res.status(500).json({ message: 'Failed to fetch pages' });
  }
});

// POST /api/pages
// Create a new page
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { title, slug, content, image, description, color, isActive } = req.body;
    
    // Check if slug already exists
    if (slug) {
      const existing = await Page.findOne({ slug });
      if (existing) {
        return res.status(400).json({ message: 'A page with this slug already exists' });
      }
    }

    const page = new Page({
      title,
      slug,
      content,
      image,
      description,
      color,
      isActive: isActive !== undefined ? isActive : true
    });

    await page.save();
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ message: 'Failed to create page' });
  }
});

// PUT /api/pages/:id
// Update an existing page
router.put('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { title, slug, content, image, description, color, isActive } = req.body;
    
    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    if (slug && slug !== page.slug) {
      const existing = await Page.findOne({ slug });
      if (existing) {
        return res.status(400).json({ message: 'A page with this slug already exists' });
      }
    }

    page.title = title || page.title;
    if (slug) page.slug = slug;
    if (content !== undefined) page.content = content;
    if (image !== undefined) page.image = image;
    if (description !== undefined) page.description = description;
    if (color !== undefined) page.color = color;
    if (isActive !== undefined) page.isActive = isActive;

    await page.save();
    res.json(page);
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ message: 'Failed to update page' });
  }
});

// DELETE /api/pages/:id
// Delete a page
router.delete('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ message: 'Failed to delete page' });
  }
});

module.exports = router;
