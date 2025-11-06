import express from 'express';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.put('/:userId', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { name, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, avatar, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.post('/:userId/skills', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { name, level, yearsOfExperience } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Skill name is required' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const skillExists = user.skills.some(skill => skill.name.toLowerCase() === name.toLowerCase());
    if (skillExists) {
      return res.status(409).json({ error: 'Skill already exists' });
    }

    user.skills.push({
      name,
      level: level || 'Beginner',
      yearsOfExperience: yearsOfExperience || 0,
      addedAt: new Date()
    });

    await user.save();

    res.status(201).json({
      message: 'Skill added successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

router.put('/:userId/skills/:skillId', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { level, yearsOfExperience } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const skill = user.skills.id(req.params.skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    if (level) skill.level = level;
    if (yearsOfExperience !== undefined) skill.yearsOfExperience = yearsOfExperience;

    await user.save();

    res.json({
      message: 'Skill updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
});

router.delete('/:userId/skills/:skillId', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const skill = user.skills.id(req.params.skillId);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    user.skills.pull(req.params.skillId);
    await user.save();

    res.json({
      message: 'Skill deleted successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

router.post('/:userId/roadmap', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { roadmapId, role, completedSteps } = req.body;

    if (!roadmapId || !role) {
      return res.status(400).json({ error: 'Roadmap ID and role are required' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        currentRoadmap: {
          roadmapId,
          role,
          startedAt: new Date(),
          completedSteps: completedSteps || [],
          progress: 0
        },
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Roadmap started',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error starting roadmap:', error);
    res.status(500).json({ error: 'Failed to start roadmap' });
  }
});

router.put('/:userId/roadmap/progress', authenticate, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { completedSteps, progress } = req.body;

    const user = await User.findById(req.userId);
    if (!user || !user.currentRoadmap) {
      return res.status(404).json({ error: 'No active roadmap' });
    }

    if (completedSteps) user.currentRoadmap.completedSteps = completedSteps;
    if (progress !== undefined) user.currentRoadmap.progress = progress;
    user.updatedAt = new Date();

    await user.save();

    res.json({
      message: 'Roadmap progress updated',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Error updating roadmap progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;
