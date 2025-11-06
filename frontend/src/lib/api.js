const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const authAPI = {
  register: async (name, email, password, confirmPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ name, email, password, confirmPassword })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getHeaders(true)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }
};

export const roadmapAPI = {
  getAllRoadmaps: async () => {
    const response = await fetch(`${API_BASE_URL}/roadmaps`, {
      method: 'GET',
      headers: getHeaders(false)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  getRoadmapByRole: async (role) => {
    const response = await fetch(`${API_BASE_URL}/roadmaps/${encodeURIComponent(role)}`, {
      method: 'GET',
      headers: getHeaders(false)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }
};

export const userAPI = {
  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: getHeaders(false)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  updateProfile: async (userId, name, bio, avatar) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ name, bio, avatar })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  addSkill: async (userId, name, level, yearsOfExperience) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/skills`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ name, level, yearsOfExperience })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  updateSkill: async (userId, skillId, level, yearsOfExperience) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/skills/${skillId}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ level, yearsOfExperience })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  deleteSkill: async (userId, skillId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/skills/${skillId}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  startRoadmap: async (userId, roadmapId, role) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/roadmap`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ roadmapId, role })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  updateRoadmapProgress: async (userId, completedSteps, progress) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/roadmap/progress`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify({ completedSteps, progress })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }
};
