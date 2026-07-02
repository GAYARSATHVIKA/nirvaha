const express = require('express');
const router = express.Router();
const storyController = require('./story.controller');
const { authenticateJWT, isAdmin } = require('../../middleware/auth');

// Public routes
router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStoryById);

// Protected routes
router.post('/my-story', authenticateJWT, storyController.saveStory);
router.get('/user/my-story', authenticateJWT, storyController.getMyStory);
router.delete('/my-story', authenticateJWT, storyController.deleteMyStory);
router.delete('/:id', authenticateJWT, isAdmin, storyController.deleteStory);

// Interaction routes
router.post('/:id/comments', authenticateJWT, storyController.addComment);
router.post('/:id/comments/:commentId/reply', authenticateJWT, storyController.addReply);
router.post('/:id/comments/:commentId/like', authenticateJWT, storyController.toggleLikeComment);

module.exports = router;
