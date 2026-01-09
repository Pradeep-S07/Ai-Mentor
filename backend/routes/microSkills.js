const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');

const microSkillsCache = new Map();

// POST /api/micro-skills - Generate micro-skills for a sub-skill
router.post('/', async (req, res) => {
  try {
    const { skill, subSkill } = req.body;

    if (!skill || !subSkill) {
      return res.status(400).json({ error: 'Skill and subSkill are required' });
    }

    const cacheKey = `${skill.toLowerCase()}-${subSkill.toLowerCase()}`;

    if (microSkillsCache.has(cacheKey)) {
      console.log(`Returning cached micro-skills for: ${cacheKey}`);
      return res.json(microSkillsCache.get(cacheKey));
    }

    console.log(`Generating micro-skills for: ${skill} -> ${subSkill}`);
    const microSkillsData = await geminiService.generateMicroSkills(skill, subSkill);

    microSkillsData.microSkills = microSkillsData.microSkills.map((ms, index) => ({
      ...ms,
      id: `${cacheKey}-${index}`,
      order: index + 1,
      isCompleted: false,
    }));

    microSkillsCache.set(cacheKey, microSkillsData);

    res.json(microSkillsData);
  } catch (error) {
    console.error('Micro-skills generation error:', error);
    
    const fallbackData = generateFallbackMicroSkills(req.body.skill, req.body.subSkill);
    res.json(fallbackData);
  }
});


function generateFallbackMicroSkills(skill, subSkill) {
  return {
    subSkill: subSkill,
    microSkills: [
      {
        id: `${skill}-${subSkill}-0`,
        title: 'Introduction',
        explanation: `Welcome to ${subSkill}! This section covers the fundamental concepts you need to understand before diving deeper. Take your time to absorb these concepts as they form the foundation for everything that follows.`,
        code: `// Example code for ${subSkill}\nconsole.log("Hello, ${subSkill}!");`,
        output: `Hello, ${subSkill}!`,
        notes: 'Start with the basics and practice regularly. Understanding these concepts well will make advanced topics much easier.',
        order: 1,
        isCompleted: false,
      },
      {
        id: `${skill}-${subSkill}-1`,
        title: 'Core Concepts',
        explanation: `Now that you understand the basics, let's explore the core concepts of ${subSkill}. These are the building blocks that you'll use in real-world applications.`,
        code: `// Core concept example\nfunction demonstrate${subSkill.replace(/\\s+/g, '')}() {\n  // Implementation here\n  return "Success!";\n}`,
        output: 'Success!',
        notes: 'Practice these concepts with different examples. Try modifying the code to see how it behaves.',
        order: 2,
        isCompleted: false,
      },
      {
        id: `${skill}-${subSkill}-2`,
        title: 'Practical Application',
        explanation: `Time to put your knowledge into practice! This section shows you how to apply ${subSkill} concepts in real scenarios.`,
        code: `// Practical example\nclass ${subSkill.replace(/\\s+/g, '')}Example {\n  constructor() {\n    this.status = "ready";\n  }\n  \n  run() {\n    console.log("Running...");\n  }\n}`,
        output: 'Running...',
        notes: 'Real-world applications often combine multiple concepts. Try to create your own examples.',
        order: 3,
        isCompleted: false,
      },
      {
        id: `${skill}-${subSkill}-3`,
        title: 'Best Practices',
        explanation: `Learn the industry best practices for ${subSkill}. Following these guidelines will make your code more maintainable and professional.`,
        code: `// Best practices example\n// 1. Use meaningful names\n// 2. Keep functions small\n// 3. Write comments\n// 4. Handle errors properly`,
        output: 'Code quality improved!',
        notes: 'Good practices become habits with consistent application. Review your old code and improve it.',
        order: 4,
        isCompleted: false,
      },
    ],
  };
}

module.exports = router;
