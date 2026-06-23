const express = require('express');
const router = express.Router();
const TrustedNetwork = require('../models/TrustedNetwork');

router.get('/', async (req, res) => {
  try {
    const items = await TrustedNetwork.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    
    res.json({ success: true, items, count: items.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching trusted network items', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const items = await TrustedNetwork.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
    
    res.json({ success: true, items, count: items.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching all trusted network items', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await TrustedNetwork.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching item', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, creator, category, image, websiteUrl, theme, accent, accentDim, sounds } = req.body;

    if (!title || !description || !creator || !image || !websiteUrl) {
      return res.status(400).json({ success: false, message: 'Title, description, creator, image, and websiteUrl are required' });
    }

    const lastItem = await TrustedNetwork.findOne().sort({ displayOrder: -1 }).lean();
    const nextOrder = (lastItem?.displayOrder || 0) + 1;

    const item = new TrustedNetwork({
      title, description, creator, category: category || 'Music', image, websiteUrl, theme, accent, accentDim, sounds, displayOrder: nextOrder, isActive: true
    });

    await item.save();
    res.status(201).json({ success: true, message: 'Item created successfully', item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating item', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    delete updates.createdAt;
    delete updates.updatedAt;

    const item = await TrustedNetwork.findByIdAndUpdate(
      req.params.id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item updated successfully', item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating item', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await TrustedNetwork.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting item', error: error.message });
  }
});

router.post('/reorder', async (req, res) => {
  try {
    const { itemIds } = req.body;
    if (!Array.isArray(itemIds)) return res.status(400).json({ success: false, message: 'itemIds must be an array' });

    const updatePromises = itemIds.map((item, index) => {
      const id = typeof item === 'string' ? item : (item.id || item._id);
      return TrustedNetwork.findByIdAndUpdate(id, { displayOrder: index, updatedAt: Date.now() });
    });

    await Promise.all(updatePromises);
    const items = await TrustedNetwork.find().sort({ displayOrder: 1 });
    res.json({ success: true, message: 'Items reordered successfully', items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reordering items', error: error.message });
  }
});

module.exports = router;
