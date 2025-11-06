import express from 'express';
import Roadmap from '../models/Roadmap.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (error) {
    console.error('Error fetching roadmaps:', error);
    res.status(500).json({ error: 'Failed to fetch roadmaps' });
  }
});

router.get('/:role', async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ role: new RegExp(req.params.role, 'i') });
    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    res.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

export default router;
