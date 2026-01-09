import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { skillApi } from '@/services/api';
import { ProgressCard } from '@/components/ProgressCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { BarChart3, Search, TrendingUp } from 'lucide-react';

export default function Progress() {
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await skillApi.getProgress();
        setProgress(data);
      } catch (err) {
        setError('Failed to load progress data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center py-16">
        <LoadingSpinner size="lg" text="Loading your progress..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </main>
    );
  }

  const totalCompleted = progress.reduce((acc, p) => acc + p.completedTopics.length, 0);
  const averageCompletion = progress.length > 0
    ? Math.round(progress.reduce((acc, p) => acc + p.completionPercentage, 0) / progress.length)
    : 0;

  return (
    <main className="flex-1 py-6">
      <div className="container">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Your Progress
          </h1>
        </div>

        {progress.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-full bg-secondary mb-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No Progress Yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto text-sm">
              Start learning a new skill and your progress will appear here.
            </p>
            <Button asChild>
              <Link to="/">
                <Search className="h-4 w-4" />
                Search a Skill
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-foreground">{progress.length}</p>
                <p className="text-xs text-muted-foreground">Skills</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
                <p className="text-xs text-muted-foreground">Topics Done</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-primary">{averageCompletion}%</p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
            </div>

            {/* Progress Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.map((p) => (
                <ProgressCard key={p.skill} progress={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
