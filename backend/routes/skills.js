const express = require('express');
const router = express.Router();

const generateRoadmap = (skill) => {
  const domain = `${skill.charAt(0).toUpperCase() + skill.slice(1)} Development`;
  
  return {
    searchedSkill: skill,
    detectedDomain: domain,
    roadmap: [
      {
        level: 'Beginner',
        topics: [
          `${skill} Fundamentals`,
          'Basic Concepts',
          'Getting Started',
          'Core Principles',
          'First Steps'
        ],
        projects: [
          'Hello World Project',
          'Basic Calculator',
          'Simple Portfolio'
        ]
      },
      {
        level: 'Intermediate',
        topics: [
          'Advanced Concepts',
          'Best Practices',
          'Design Patterns',
          'Testing Basics',
          'API Integration'
        ],
        projects: [
          'Task Manager App',
          'Weather Dashboard',
          'Blog Platform'
        ]
      },
      {
        level: 'Advanced',
        topics: [
          'Performance Optimization',
          'Security Best Practices',
          'Scalability',
          'CI/CD Integration',
          'System Design'
        ],
        projects: [
          'Full-Stack Application',
          'Real-time Chat App',
          'E-commerce Platform'
        ]
      }
    ]
  };
};

// Search skill and get roadmap
router.get('/search', async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ error: 'Skill parameter is required' });
    }

    // Generate roadmap (replace with actual ML API call)
    const roadmap = generateRoadmap(skill);

    res.json(roadmap);
  } catch (error) {
    console.error('Search skill error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
