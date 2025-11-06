import { CheckCircle2, Circle, ExternalLink, BookOpen } from 'lucide-react';

export default function RoadmapCard({ step, isCompleted, onToggleComplete }) {
  return (
    <div
      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-xl ${
        isCompleted
          ? 'border-green-500 bg-gradient-to-br from-green-50 to-white'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={onToggleComplete}
            className="flex-shrink-0 mt-1 group transition-transform hover:scale-110 active:scale-95"
            aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-8 h-8 text-green-500 group-hover:text-green-600" />
            ) : (
              <Circle className="w-8 h-8 text-gray-300 group-hover:text-blue-500" />
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-2">
                  Step {step.step}
                </span>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isCompleted ? 'text-gray-600 line-through' : 'text-gray-900'
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>

            {step.resources && step.resources.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Learning Resources
                  </span>
                </div>
                <div className="space-y-2">
                  {step.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 hover:underline group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      <span className="truncate">
                        {new URL(resource).hostname.replace('www.', '')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Completed!
          </div>
        </div>
      )}
    </div>
  );
}
