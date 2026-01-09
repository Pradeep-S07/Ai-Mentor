import { useState } from 'react';
import { Upload, Link, Code, Send, Loader2, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

export function ProjectSubmission({ project, onSubmit, isSubmitting }) {
  const [submissionType, setSubmissionType] = useState('code');
  const [codeContent, setCodeContent] = useState('');
  const [urlContent, setUrlContent] = useState('');

  const handleSubmit = () => {
    const content = submissionType === 'code' ? codeContent : urlContent;
    if (!content.trim()) return;
    
    onSubmit({
      submissionType,
      content,
    });
  };

  const isValid = submissionType === 'code' ? codeContent.trim().length > 0 : urlContent.trim().length > 0;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>

      {/* Requirements */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Requirements</h4>
        <ul className="space-y-1">
          {project.requirements?.map((req, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Submission Type */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Submission Method</h4>
        <div className="flex gap-2">
          <Button
            variant={submissionType === 'code' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSubmissionType('code')}
          >
            <Code className="h-4 w-4 mr-1" />
            Code
          </Button>
          <Button
            variant={submissionType === 'url' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSubmissionType('url')}
          >
            <Link className="h-4 w-4 mr-1" />
            URL
          </Button>
        </div>
      </div>

      {/* Submission Input */}
      <div className="space-y-2">
        {submissionType === 'code' ? (
          <textarea
            placeholder="Paste your code here..."
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            className="w-full h-48 p-3 border rounded-lg bg-background font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        ) : (
          <Input
            type="url"
            placeholder="Enter your project URL (GitHub, live demo, etc.)"
            value={urlContent}
            onChange={(e) => setUrlContent(e.target.value)}
          />
        )}
      </div>

      {/* Submit Button */}
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Evaluating...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Submit Project
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Passing score: {project.passingScore || 75}/100
      </p>
    </div>
  );
}

export function ProjectResult({ result, onContinue, onRetry }) {
  const passed = result.passed;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-6">
      {/* Score Display */}
      <div className="text-center">
        <div
          className={cn(
            'w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4',
            passed ? 'bg-emerald-100' : 'bg-red-100'
          )}
        >
          {passed ? (
            <Trophy className="h-12 w-12 text-emerald-600" />
          ) : (
            <XCircle className="h-12 w-12 text-red-600" />
          )}
        </div>
        <div className="text-4xl font-bold text-foreground mb-1">
          {result.score}/{result.maxScore}
        </div>
        <div
          className={cn(
            'text-lg font-medium',
            passed ? 'text-emerald-600' : 'text-red-600'
          )}
        >
          {passed ? 'PASSED!' : 'NEEDS IMPROVEMENT'}
        </div>
      </div>

      {/* Feedback */}
      {result.feedback && (
        <div className="space-y-4">
          <p className="text-sm text-foreground text-center">
            {result.feedback.summary}
          </p>

          {result.feedback.strengths?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Strengths
              </h4>
              <ul className="space-y-1">
                {result.feedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.feedback.improvements?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-amber-700 flex items-center gap-1">
                <XCircle className="h-4 w-4" />
                Areas to Improve
              </h4>
              <ul className="space-y-1">
                {result.feedback.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-amber-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {passed ? (
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={onContinue}>
            Continue to Next Skill
          </Button>
        ) : (
          <>
            <Button variant="outline" className="flex-1" onClick={onRetry}>
              Try Again
            </Button>
            <Button className="flex-1" onClick={onContinue}>
              Review Materials
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
