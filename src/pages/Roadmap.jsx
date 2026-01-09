import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoadmap } from '@/context/RoadmapContext';
import { RoadmapCard } from '@/components/RoadmapCard';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { skillApi } from '@/services/api';
import { toast } from 'sonner';
import { ArrowLeft, Save, Brain, GraduationCap } from 'lucide-react';

export default function Roadmap() {
  const navigate = useNavigate();
  const { roadmapData, completedTopics, toggleTopic } = useRoadmap();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!roadmapData) {
      navigate('/');
    }
  }, [roadmapData, navigate]);

  if (!roadmapData) {
    return null;
  }

  const handleSaveProgress = async () => {
    setIsSaving(true);
    try {
      await skillApi.updateProgress({
        skill: roadmapData.detectedDomain,
        completedTopics: Array.from(completedTopics),
      });
      toast.success('Progress saved successfully!');
    } catch (error) {
      toast.error('Failed to save progress. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartLearning = () => {
    navigate(`/learn?skill=${encodeURIComponent(roadmapData.searchedSkill)}`);
  };

  const totalTopics = roadmapData.roadmap.reduce((acc, level) => acc + level.topics.length, 0);
  const completionPercentage = Math.round((completedTopics.size / totalTopics) * 100);

  return (
    <main className="flex-1 py-6">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-3 -ml-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <Brain className="h-4 w-4" />
                <span>ML-Detected Domain</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                {roadmapData.detectedDomain}
              </h1>
              <p className="text-sm text-muted-foreground">
                Searched: {roadmapData.searchedSkill}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">{completionPercentage}%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>

              <Button
                variant="success"
                onClick={handleSaveProgress}
                disabled={isSaving || completedTopics.size === 0}
              >
                {isSaving ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Progress
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Start Learning CTA */}
        <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <GraduationCap className="h-6 w-6 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground">Ready to dive deep?</h3>
                <p className="text-sm text-muted-foreground">
                  Start the interactive learning path with code examples, tutorials, and projects.
                </p>
              </div>
            </div>
            <Button onClick={handleStartLearning} className="shrink-0">
              <GraduationCap className="h-4 w-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </div>

        {/* Roadmap Levels */}
        <div className="grid gap-4 lg:grid-cols-3">
          {roadmapData.roadmap.map((level, index) => (
            <RoadmapCard
              key={level.level}
              level={level}
              completedTopics={completedTopics}
              onToggleTopic={toggleTopic}
              index={index}
            />
          ))}
        </div>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/30 text-center">
            <h3 className="font-semibold text-foreground mb-1">
              Congratulations! 🎉
            </h3>
            <p className="text-sm text-muted-foreground">
              You've completed all topics. Don't forget to save your progress!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
