import { useState } from 'react';
import { GraduationCap, Github, Mail } from 'lucide-react';
import RoleInput from './components/RoleInput';
import Dashboard from './components/Dashboard';
import { Roadmap } from './lib/supabase';
import { fetchRoadmapByRole } from './services/roadmapService';

function App() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRoadmap = async (role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedRoadmap = await fetchRoadmapByRole(role);

      if (!fetchedRoadmap) {
        setError(
          `We couldn't find a roadmap for "${role}". Try "Frontend Developer", "DevOps Engineer", or "Full Stack Developer".`
        );
        setRoadmap(null);
      } else {
        setRoadmap(fetchedRoadmap);
      }
    } catch (err) {
      setError('Failed to generate roadmap. Please try again.');
      console.error('Error generating roadmap:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoadmap(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
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
      </main>

      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>
            Built with React, TypeScript, Tailwind CSS, and Supabase
          </p>
          <p className="mt-2">
            Empowering learners to forge their own path to success
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
