import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface RoleInputProps {
  onGenerate: (role: string) => void;
  isLoading: boolean;
}

export default function RoleInput({ onGenerate, isLoading }: RoleInputProps) {
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim()) {
      onGenerate(role.trim());
    }
  };

  const quickRoles = ['Frontend Developer', 'DevOps Engineer', 'Full Stack Developer'];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI-Powered Learning Paths</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What do you want to become?
        </h1>
        <p className="text-lg text-gray-600">
          Enter your dream career and get a personalized learning roadmap
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Frontend Developer, Data Scientist, DevOps Engineer..."
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !role.trim()}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Roadmap...
            </span>
          ) : (
            'Generate My Roadmap'
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500 mb-3">Popular career paths:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {quickRoles.map((quickRole) => (
            <button
              key={quickRole}
              onClick={() => setRole(quickRole)}
              disabled={isLoading}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {quickRole}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
