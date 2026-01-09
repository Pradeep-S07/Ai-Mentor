import { useState } from 'react';
import { Check, Copy, ChevronDown, ChevronUp, BookOpen, Code, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function MicroSkillCard({ microSkill, isCompleted, onComplete }) {
  const [isExpanded, setIsExpanded] = useState(!isCompleted);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (microSkill.code) {
      await navigator.clipboard.writeText(microSkill.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={cn(
        'rounded-lg border bg-card overflow-hidden transition-all',
        isCompleted ? 'border-emerald-300 bg-emerald-50/50' : 'border-border'
      )}
    >
      {/* Header */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              isCompleted
                ? 'bg-emerald-500 text-white'
                : 'bg-primary/10 text-primary'
            )}
          >
            {isCompleted ? <Check className="h-4 w-4" /> : microSkill.order}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{microSkill.title}</h4>
            <p className="text-xs text-muted-foreground">
              {isCompleted ? 'Completed' : 'In Progress'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t p-4 space-y-4">
          {/* Explanation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Explanation</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {microSkill.explanation}
            </p>
          </div>

          {/* Code Example */}
          {microSkill.code && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Code Example</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyCode}
                  className="h-8 text-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{microSkill.code}</code>
              </pre>
            </div>
          )}

          {/* Output */}
          {microSkill.output && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>Expected Output</span>
              </div>
              <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                {microSkill.output}
              </div>
            </div>
          )}

          {/* Notes */}
          {microSkill.notes && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Lightbulb className="h-4 w-4" />
                <span>Key Notes</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-sm text-amber-900">
                {microSkill.notes}
              </div>
            </div>
          )}

          {/* Complete Button */}
          {!isCompleted && (
            <div className="pt-2">
              <Button
                onClick={() => onComplete(microSkill.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
