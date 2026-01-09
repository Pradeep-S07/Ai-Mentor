import { TopicCheckbox } from './TopicCheckbox';
import { BookOpen, Lightbulb, Rocket, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const levelConfig = {
  Beginner: {
    icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  Intermediate: {
    icon: Lightbulb,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  Advanced: {
    icon: Rocket,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
};

export function RoadmapCard({ level, completedTopics, onToggleTopic }) {
  const config = levelConfig[level.level];
  const Icon = config.icon;
  const completedCount = level.topics.filter(t => completedTopics.has(t)).length;

  return (
    <div className={cn('rounded-lg border bg-card overflow-hidden', config.border)}>
      {/* Header */}
      <div className={cn('p-4 border-b', config.bg, config.border)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={cn('h-5 w-5', config.color)} />
            <div>
              <h3 className="font-semibold text-foreground">{level.level}</h3>
              <p className="text-xs text-muted-foreground">
                {completedCount}/{level.topics.length} completed
              </p>
            </div>
          </div>
          <span className={cn('text-sm font-medium', config.color)}>
            {Math.round((completedCount / level.topics.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Topics */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Topics
          </h4>
          <div className="space-y-1">
            {level.topics.map((topic) => (
              <TopicCheckbox
                key={topic}
                topic={topic}
                checked={completedTopics.has(topic)}
                onChange={onToggleTopic}
              />
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <FolderOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Projects
            </h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {level.projects.map((project) => (
              <span
                key={project}
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
