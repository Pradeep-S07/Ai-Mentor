import { Lock, Unlock, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SubSkillCard({ subSkill, isActive, isUnlocked, isCompleted, completedMicroSkills, totalMicroSkills, onClick }) {
  const progress = totalMicroSkills > 0 ? (completedMicroSkills / totalMicroSkills) * 100 : 0;

  return (
    <div
      onClick={() => isUnlocked && onClick(subSkill)}
      className={cn(
        'rounded-lg border p-4 transition-all cursor-pointer',
        isActive && 'ring-2 ring-primary border-primary',
        isCompleted && 'bg-emerald-50 border-emerald-300',
        !isUnlocked && 'opacity-60 cursor-not-allowed bg-muted/50',
        isUnlocked && !isActive && !isCompleted && 'hover:border-primary/50 hover:shadow-sm'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
              isCompleted && 'bg-emerald-500 text-white',
              isUnlocked && !isCompleted && 'bg-primary text-primary-foreground',
              !isUnlocked && 'bg-muted text-muted-foreground'
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : isUnlocked ? (
              <Unlock className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{subSkill.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {subSkill.description}
            </p>
            
            {/* Progress bar */}
            {isUnlocked && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {completedMicroSkills}/{totalMicroSkills} topics
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      isCompleted ? 'bg-emerald-500' : 'bg-primary'
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isUnlocked && (
          <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </div>
    </div>
  );
}
