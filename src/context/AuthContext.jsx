import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    if (response.success && response.user) {
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    }
    throw new Error(response.error || 'Login failed');
  };

  const register = async (name, email, password) => {
    const response = await authApi.register(name, email, password);
    if (response.success && response.user) {
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    }
    throw new Error(response.error || 'Registration failed');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
