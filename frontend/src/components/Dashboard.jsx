import { useState, useEffect } from 'react';
import { Target, Trophy, Rocket, RotateCcw } from 'lucide-react';
import RoadmapCard from './RoadmapCard';
import { userAPI } from '../lib/api';

export default function Dashboard({ roadmap, onReset }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    loadProgress();
  }, [roadmap._id]);

  const loadProgress = async () => {
    try {
      setIsLoading(true);
      const localProgress = localStorage.getItem(`progress-${roadmap._id}`);
      if (localProgress) {
        setCompletedSteps(JSON.parse(localProgress));
      } else {
        setCompletedSteps([]);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStep = async (stepNumber) => {
    const newCompletedSteps = completedSteps.includes(stepNumber)
      ? completedSteps.filter(s => s !== stepNumber)
      : [...completedSteps, stepNumber];

    setCompletedSteps(newCompletedSteps);
    localStorage.setItem(`progress-${roadmap._id}`, JSON.stringify(newCompletedSteps));

    try {
      if (userId && roadmap._id) {
        const progressPercentage = (newCompletedSteps.length / roadmap.steps.length) * 100;
        await userAPI.updateRoadmapProgress(userId, newCompletedSteps, progressPercentage);
      }
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const totalSteps = roadmap.steps.length;
  const completedCount = completedSteps.length;
  const progressPercentage = totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;

  const getProgressMessage = () => {
    if (progressPercentage === 0) return "Let's start your journey!";
    if (progressPercentage < 50) return "Great start! Keep going!";
    if (progressPercentage < 100) return "You're making excellent progress!";
    return "Congratulations! You've completed the roadmap!";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="text-sm font-medium">Choose Different Career</span>
        </button>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-6 h-6" />
                <span className="text-sm font-semibold opacity-90">Your Learning Path</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{roadmap.role}</h2>
              <p className="text-blue-100 text-lg">{roadmap.description}</p>
            </div>
            {progressPercentage === 100 && (
              <Trophy className="w-12 h-12 text-yellow-300 animate-bounce" />
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">
                {completedCount} of {totalSteps} steps completed
              </span>
              <span className="font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 10 && (
                  <Rocket className="w-3 h-3 text-blue-600" />
                )}
              </div>
            </div>
            <p className="text-sm font-medium text-blue-100">{getProgressMessage()}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-cyan-500 rounded-full" />
          <h3 className="text-2xl font-bold text-gray-900">Learning Steps</h3>
        </div>

        {roadmap.steps.map((step) => (
          <RoadmapCard
            key={step.step}
            step={step}
            isCompleted={completedSteps.includes(step.step)}
            onToggleComplete={() => handleToggleStep(step.step)}
          />
        ))}
      </div>

      {progressPercentage === 100 && (
        <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-2 border-green-500 rounded-2xl p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-600 mb-4">
            You've completed the {roadmap.role} roadmap. Keep learning and building amazing projects!
          </p>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all"
          >
            <Rocket className="w-5 h-5" />
            Explore Another Career Path
          </button>
        </div>
      )}
    </div>
  );
}
