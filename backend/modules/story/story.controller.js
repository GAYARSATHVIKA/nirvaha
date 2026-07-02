const Story = require('./story.model');

// Create or update a user's story
exports.saveStory = async (req, res) => {
  try {
    const { title, quote, trauma, nirvahaHelp, image, favorites } = req.body;
    const authorId = req.user.id;
    const authorName = req.user.name;
    const authorAvatar = req.user.avatar;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    let story = await Story.findOne({ authorId });
    if (story) {
      // Update existing
      story.title = title;
      story.quote = quote;
      story.trauma = trauma;
      story.nirvahaHelp = nirvahaHelp;
      story.image = image || story.image;
      story.favorites = favorites || story.favorites;
      story.authorName = authorName;
      story.authorAvatar = authorAvatar;
      story.updatedAt = Date.now();
      await story.save();
    } else {
      // Create new
      story = new Story({
        authorId,
        authorName,
        authorAvatar,
        title,
        quote,
        trauma,
        nirvahaHelp,
        image,
        favorites
      });
      await story.save();
    }

    res.status(200).json({ message: 'Story saved successfully', story });
  } catch (err) {
    console.error('Error saving story:', err);
    res.status(500).json({ error: 'Failed to save story' });
  }
};

// Get all public stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.status(200).json(stories);
  } catch (err) {
    console.error('Error fetching all stories:', err);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};

// Delete a story by ID (Admin only)
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error('Error deleting story:', err);
    res.status(500).json({ error: 'Failed to delete story' });
  }
};

// Get the logged in user's story
exports.getMyStory = async (req, res) => {
  try {
    const story = await Story.findOne({ authorId: req.user.id });
    if (!story) {
      return res.status(404).json({ error: 'No story found' });
    }
    res.status(200).json(story);
  } catch (err) {
    console.error('Error fetching my story:', err);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
};

// Delete the logged in user's story
exports.deleteMyStory = async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({ authorId: req.user.id });
    if (!story) {
      return res.status(404).json({ error: 'No story found to delete' });
    }
    res.status(200).json({ message: 'Your story deleted successfully' });
  } catch (err) {
    console.error('Error deleting my story:', err);
    res.status(500).json({ error: 'Failed to delete your story' });
  }
};

// Get a specific story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (err) {
    console.error('Error fetching story:', err);
    res.status(500).json({ error: 'Failed to fetch story' });
  }
};

// Add a comment to a story
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const story = await Story.findById(req.params.id);
    
    if (!story) return res.status(404).json({ error: 'Story not found' });
    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    const newComment = {
      userId: req.user.id,
      userName: req.user.name,
      userAvatar: req.user.profilePicture,
      text
    };

    story.comments.push(newComment);
    await story.save();

    res.status(200).json({ message: 'Comment added', comments: story.comments });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Add a reply to a comment
exports.addReply = async (req, res) => {
  try {
    const { text } = req.body;
    const story = await Story.findById(req.params.id);
    
    if (!story) return res.status(404).json({ error: 'Story not found' });
    if (!text) return res.status(400).json({ error: 'Reply text is required' });

    const comment = story.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const newReply = {
      userId: req.user.id,
      userName: req.user.name,
      userAvatar: req.user.profilePicture,
      text
    };

    comment.replies.push(newReply);
    await story.save();

    res.status(200).json({ message: 'Reply added', comments: story.comments });
  } catch (err) {
    console.error('Error adding reply:', err);
    res.status(500).json({ error: 'Failed to add reply' });
  }
};

// Toggle like on a comment
exports.toggleLikeComment = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ error: 'Story not found' });

    const comment = story.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userId = req.user.id;
    const hasLikedIndex = comment.likedBy.indexOf(userId);

    if (hasLikedIndex > -1) {
      // Unlike
      comment.likedBy.splice(hasLikedIndex, 1);
      comment.likes -= 1;
    } else {
      // Like
      comment.likedBy.push(userId);
      comment.likes += 1;
    }

    await story.save();
    res.status(200).json({ message: 'Like toggled', comments: story.comments });
  } catch (err) {
    console.error('Error toggling like:', err);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};
