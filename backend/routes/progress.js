const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update skill progress
router.post('/update', async (req, res) => {
  try {
    const { userId, skill, domain, completedTopics, totalTopics } = req.body;

    if (!userId || !skill) {
      return res.status(400).json({ error: 'User ID and skill are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingIndex = user.skillProgress.findIndex(
      (sp) => sp.skill.toLowerCase() === skill.toLowerCase()
    );

    const completionPercentage = totalTopics > 0 
      ? Math.round((completedTopics.length / totalTopics) * 100) 
      : 0;

    if (existingIndex > -1) {
      user.skillProgress[existingIndex] = {
        ...user.skillProgress[existingIndex].toObject(),
        skill,
        domain: domain || user.skillProgress[existingIndex].domain,
        completedTopics,
        totalTopics: totalTopics || user.skillProgress[existingIndex].totalTopics,
        completionPercentage,
        lastUpdated: Date.now()
      };
    } else {
      user.skillProgress.push({
        skill,
        domain: domain || '',
        completedTopics,
        totalTopics: totalTopics || 15,
        completionPercentage,
        lastUpdated: Date.now()
      });
    }

    await user.save();

    res.json({ success: true, skillProgress: user.skillProgress });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('skillProgress');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ skillProgress: user.skillProgress });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete skill progress
router.delete('/:userId/:skill', async (req, res) => {
  try {
    const { userId, skill } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.skillProgress = user.skillProgress.filter(
      (sp) => sp.skill.toLowerCase() !== skill.toLowerCase()
    );

    await user.save();

    res.json({ success: true, skillProgress: user.skillProgress });
  } catch (error) {
    console.error('Delete progress error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
