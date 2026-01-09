import { ProgressBar } from './ProgressBar';
import { CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProgressCard({ progress }) {
  const isComplete = progress.completionPercentage === 100;

  return (
    <div className={cn(
      'rounded-lg border bg-card p-4',
      isComplete ? 'border-success/50' : 'border-border'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{progress.skill}</h3>
          <p className="text-xs text-muted-foreground">
            {progress.completedTopics.length} topics completed
          </p>
        </div>
        {isComplete ? (
          <CheckCircle2 className="h-5 w-5 text-success" />
        ) : (
          <Clock className="h-5 w-5 text-muted-foreground" />
        )}
      </div>

      <ProgressBar value={progress.completionPercentage} size="md" />

      {progress.completedTopics.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1.5">Completed</p>
          <div className="flex flex-wrap gap-1">
            {progress.completedTopics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded"
              >
                {topic}
              </span>
            ))}
            {progress.completedTopics.length > 4 && (
              <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded">
                +{progress.completedTopics.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
