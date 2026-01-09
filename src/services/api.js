// API Service - Centralized API logic
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper for API calls
const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

export const skillApi = {
  // Search for a skill and get basic roadmap (legacy)
  async searchSkill(skill) {
    return apiCall(`/skills/search?skill=${encodeURIComponent(skill)}`);
  },
};

export const roadmapApi = {
  // Generate roadmap with sub-skills
  async generateRoadmap(skill) {
    return apiCall('/roadmap', {
      method: 'POST',
      body: JSON.stringify({ skill }),
    });
  },
};

export const microSkillsApi = {
  // Generate micro-skills for a sub-skill
  async getMicroSkills(skill, subSkill) {
    return apiCall('/micro-skills', {
      method: 'POST',
      body: JSON.stringify({ skill, subSkill }),
    });
  },
};

export const projectApi = {
  // Get project assignment for a sub-skill
  async getProject(subSkill) {
    return apiCall(`/project/${encodeURIComponent(subSkill)}`);
  },

  // Submit a project
  async submitProject(data) {
    return apiCall('/project/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export const progressApi = {
  // Update micro-skill completion
  async updateMicroSkillProgress(payload) {
    return apiCall('/progress/micro-skill', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Get user progress
  async getProgress(userId) {
    return apiCall(`/progress/${userId}`);
  },
};

export const authApi = {
  // Login
  async login(email, password) {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  // Register
  async register(name, email, password) {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
};
