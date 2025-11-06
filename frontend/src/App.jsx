import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GraduationCap, Github, Mail, LogOut, User as UserIcon } from 'lucide-react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import RoleInput from './components/RoleInput';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { roadmapAPI } from './lib/api';

function RoadmapApp() {
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateRoadmap = async (role) => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedRoadmap = await roadmapAPI.getRoadmapByRole(role);
      setRoadmap(fetchedRoadmap);
    } catch (err) {
      setError(
        `We couldn't find a roadmap for "${role}". Try "Frontend Developer", "DevOps Engineer", "Full Stack Developer", or "Backend Developer".`
      );
      setRoadmap(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoadmap(null);
    setError(null);
  };

  return (
    <>
      {!roadmap ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <RoleInput onGenerate={handleGenerateRoadmap} isLoading={isLoading} />
          {error && (
            <div className="mt-6 max-w-3xl w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <Dashboard roadmap={roadmap} onReset={handleReset} />
      )}
    </>
  );
}

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SkillForge</h1>
            <p className="text-xs text-gray-600">AI Mentor Roadmap Generator</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@skillforge.dev"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>

          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  <a
                    href={`/profile/${user._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                    onClick={() => setShowMenu(false)}
                  >
                    View Profile
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
        <p>
          Built with React, JavaScript, Tailwind CSS, Node.js, Express, and MongoDB
        </p>
        <p className="mt-2">
          Empowering learners to forge their own path to success
        </p>
      </div>
    </footer>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><RoadmapApp /></PrivateRoute>} />
          <Route path="/profile/:userId" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
