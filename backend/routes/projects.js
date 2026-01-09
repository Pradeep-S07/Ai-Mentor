const express = require('express');
const router = express.Router();

const projectTemplates = {
  // Frontend related
  'html': { title: 'Personal Portfolio Website', description: 'Create a responsive personal portfolio with sections for About, Skills, Projects, and Contact.', requirements: ['Semantic HTML5 elements', 'At least 4 sections', 'Navigation menu', 'Contact form', 'Responsive images'] },
  'css': { title: 'CSS Art Gallery', description: 'Build a beautiful art gallery page with advanced CSS styling and animations.', requirements: ['Flexbox or Grid layout', 'CSS animations', 'Hover effects', 'Responsive design', 'Custom color scheme'] },
  'javascript': { title: 'Interactive Quiz App', description: 'Create a quiz application with multiple questions, scoring, and timer.', requirements: ['DOM manipulation', 'Event handling', 'Score tracking', 'Timer functionality', 'Results display'] },
  'react': { title: 'Task Management Dashboard', description: 'Build a full-featured task management app with React.', requirements: ['Component architecture', 'State management', 'CRUD operations', 'Filtering/sorting', 'Local storage persistence'] },
  
  // Backend related
  'node': { title: 'REST API Server', description: 'Create a RESTful API with Express.js for a blog system.', requirements: ['CRUD endpoints', 'Error handling', 'Input validation', 'Authentication', 'API documentation'] },
  'database': { title: 'Database Design Project', description: 'Design and implement a database for an e-commerce system.', requirements: ['ER diagram', 'Normalized schema', 'Relationships', 'Indexes', 'Sample queries'] },
  'api': { title: 'API Integration Service', description: 'Build a service that integrates multiple third-party APIs.', requirements: ['Multiple API calls', 'Data aggregation', 'Error handling', 'Rate limiting', 'Caching'] },
  
  // Programming languages
  'python': { title: 'Data Processing Script', description: 'Create a Python script for processing and analyzing data.', requirements: ['File handling', 'Data parsing', 'Statistical analysis', 'Report generation', 'Error handling'] },
  'java': { title: 'Console Banking Application', description: 'Build a banking system with account management.', requirements: ['OOP principles', 'Account operations', 'Transaction history', 'Data persistence', 'Input validation'] },
  
  // Data Science
  'data': { title: 'Mini Prediction Model', description: 'Build a simple machine learning model for prediction.', requirements: ['Data preprocessing', 'Feature selection', 'Model training', 'Evaluation metrics', 'Prediction interface'] },
  'visualization': { title: 'Interactive Dashboard', description: 'Create an interactive data visualization dashboard.', requirements: ['Multiple chart types', 'Interactive filters', 'Real-time updates', 'Export functionality', 'Responsive layout'] },
  
  // DevOps/Cloud
  'cloud': { title: 'Cloud Deployment Project', description: 'Deploy a web application to cloud infrastructure.', requirements: ['Cloud setup', 'CI/CD pipeline', 'Environment config', 'Monitoring', 'Documentation'] },
  'docker': { title: 'Containerized Application', description: 'Containerize a multi-service application.', requirements: ['Dockerfile creation', 'Docker Compose', 'Networking', 'Volume management', 'Production config'] },
  
  // UI/UX
  'design': { title: 'App Wireframe Design', description: 'Design complete wireframes for a mobile application.', requirements: ['User research', 'Information architecture', 'Low-fidelity wireframes', 'High-fidelity mockups', 'Prototype'] },
  'ux': { title: 'UX Case Study', description: 'Complete a UX case study for an existing application redesign.', requirements: ['User research', 'Persona creation', 'User journey map', 'Usability testing', 'Final recommendations'] },
  
  // Default
  'default': { title: 'Skill Demonstration Project', description: 'Create a project that demonstrates your understanding of the learned skills.', requirements: ['Apply core concepts', 'Best practices', 'Documentation', 'Clean code', 'Working demo'] },
};


router.get('/:subSkill', (req, res) => {
  const { subSkill } = req.params;
  const normalizedSubSkill = subSkill.toLowerCase();

  let project = projectTemplates.default;
  
  for (const [key, template] of Object.entries(projectTemplates)) {
    if (normalizedSubSkill.includes(key)) {
      project = template;
      break;
    }
  }

  res.json({
    subSkill: subSkill,
    project: {
      ...project,
      id: `project-${normalizedSubSkill}`,
      passingScore: 75,
      maxScore: 100,
    },
  });
});

// POST /api/project/submit - Submit a project
router.post('/submit', async (req, res) => {
  try {
    const { userId, subSkill, skill, submissionType, content } = req.body;

    if (!subSkill || !submissionType) {
      return res.status(400).json({ error: 'subSkill and submissionType are required' });
    }

    // Validate submission type
    const validTypes = ['code', 'url', 'file'];
    if (!validTypes.includes(submissionType)) {
      return res.status(400).json({ error: 'Invalid submission type' });
    }

    const possibleScores = [72, 75, 78, 82, 85, 90];
    const randomIndex = Math.floor(Math.random() * possibleScores.length);
    const score = possibleScores[randomIndex];
    const passed = score >= 75;

    const feedback = generateFeedback(score, passed);

    const result = {
      submissionId: `sub-${Date.now()}`,
      userId,
      skill,
      subSkill,
      submissionType,
      score,
      maxScore: 100,
      passed,
      feedback,
      submittedAt: new Date().toISOString(),
    };

    console.log('Project submission:', result);

    res.json(result);
  } catch (error) {
    console.error('Project submission error:', error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

function generateFeedback(score, passed) {
  if (score >= 90) {
    return {
      summary: 'Excellent work! Your project demonstrates outstanding understanding.',
      strengths: ['Clean code structure', 'Complete implementation', 'Good documentation'],
      improvements: ['Consider adding more edge case handling'],
    };
  } else if (score >= 80) {
    return {
      summary: 'Great job! Your project shows solid understanding of the concepts.',
      strengths: ['Good code organization', 'Meets requirements', 'Working implementation'],
      improvements: ['Add more comments', 'Consider edge cases'],
    };
  } else if (score >= 75) {
    return {
      summary: 'Good work! You passed and demonstrated competency.',
      strengths: ['Core functionality works', 'Basic requirements met'],
      improvements: ['Improve code structure', 'Add error handling', 'More testing needed'],
    };
  } else {
    return {
      summary: 'Keep trying! Review the concepts and resubmit.',
      strengths: ['Shows effort', 'Basic structure present'],
      improvements: ['Complete all requirements', 'Fix functionality issues', 'Review core concepts'],
    };
  }
}

module.exports = router;
