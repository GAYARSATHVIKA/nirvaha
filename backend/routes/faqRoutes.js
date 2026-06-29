const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');
const { authenticateJWT, isAdmin } = require('../middleware/auth');

// Get all FAQs (public)
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort('order createdAt');
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
  }
});

// Get all FAQs including inactive (admin)
router.get('/all', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const faqs = await FAQ.find().sort('order createdAt');
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching all FAQs:', error);
    res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
  }
});

// Create a new FAQ
router.post('/', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { question, answer, image, isActive, order } = req.body;
    
    const faq = new FAQ({
      question,
      answer,
      image,
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ message: 'Error creating FAQ', error: error.message });
  }
});

// Update an existing FAQ
router.put('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { question, answer, image, isActive, order } = req.body;
    
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;
    if (image !== undefined) faq.image = image;
    if (isActive !== undefined) faq.isActive = isActive;
    if (order !== undefined) faq.order = order;

    await faq.save();
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ message: 'Error updating FAQ', error: error.message });
  }
});

// Delete a FAQ
router.delete('/:id', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.deleteOne();
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
  }
});

module.exports = router;
