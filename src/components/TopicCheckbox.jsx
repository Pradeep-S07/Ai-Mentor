import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopicCheckbox({ topic, checked, onChange }) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors',
        checked 
          ? 'bg-accent' 
          : 'hover:bg-secondary'
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center h-4 w-4 rounded border transition-colors',
          checked
            ? 'bg-primary border-primary'
            : 'border-muted-foreground/40'
        )}
      >
        {checked && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(topic)}
        className="sr-only"
      />
      <span
        className={cn(
          'text-sm transition-colors',
          checked ? 'text-muted-foreground line-through' : 'text-foreground'
        )}
      >
        {topic}
      </span>
    </label>
  );
}
