const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');

const roadmapCache = new Map();

router.post('/', async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({ error: 'Skill is required' });
    }

    const normalizedSkill = skill.toLowerCase().trim();

    if (roadmapCache.has(normalizedSkill)) {
      console.log(`Returning cached roadmap for: ${normalizedSkill}`);
      return res.json(roadmapCache.get(normalizedSkill));
    }

    console.log(`Generating roadmap for: ${normalizedSkill}`);
    const roadmap = await geminiService.generateRoadmap(skill);

    roadmap.subSkills = roadmap.subSkills.map((subSkill, index) => ({
      ...subSkill,
      id: `${normalizedSkill}-${index}`,
      order: subSkill.order || index + 1,
      isUnlocked: index === 0, 
      isCompleted: false,
    }));

    roadmapCache.set(normalizedSkill, roadmap);

    res.json(roadmap);
  } catch (error) {
    console.error('Roadmap generation error:', error);
    
    const fallbackRoadmap = generateFallbackRoadmap(req.body.skill);
    res.json(fallbackRoadmap);
  }
});


function generateFallbackRoadmap(skill) {
  const skillName = skill || 'Programming';
  return {
    skill: skillName,
    domain: `${skillName} Development`,
    subSkills: [
      { id: `${skillName}-0`, name: 'Fundamentals', description: 'Core concepts and basics', order: 1, isUnlocked: true, isCompleted: false },
      { id: `${skillName}-1`, name: 'Intermediate Concepts', description: 'Building on the basics', order: 2, isUnlocked: false, isCompleted: false },
      { id: `${skillName}-2`, name: 'Advanced Topics', description: 'Expert-level knowledge', order: 3, isUnlocked: false, isCompleted: false },
      { id: `${skillName}-3`, name: 'Best Practices', description: 'Industry standards and patterns', order: 4, isUnlocked: false, isCompleted: false },
      { id: `${skillName}-4`, name: 'Real-world Projects', description: 'Practical applications', order: 5, isUnlocked: false, isCompleted: false },
    ],
  };
}

module.exports = router;
