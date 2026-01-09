import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useRoadmap } from '@/context/RoadmapContext';
import { skillApi } from '@/services/api';
import { toast } from 'sonner';
import { Target, TrendingUp, Zap } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'AI-Powered Roadmaps',
    description: 'Get personalized learning paths based on ML analysis',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your journey with visual progress tracking',
  },
  {
    icon: Zap,
    title: 'Curated Projects',
    description: 'Practice with hand-picked projects for each level',
  },
];

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setRoadmapData, clearCompleted } = useRoadmap();

  const handleSearch = async (skill) => {
    setIsLoading(true);
    try {
      const data = await skillApi.searchSkill(skill);
      setRoadmapData(data);
      clearCompleted();
      navigate('/roadmap');
    } catch (error) {
      toast.error('Failed to generate roadmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Skill Roadmap Generator
            </h1>
            <p className="text-muted-foreground mb-8">
              Enter a skill and get a personalized learning roadmap with topics, 
              projects, and progress tracking powered by ML.
            </p>

            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center mt-10">
              <LoadingSpinner size="lg" text="Generating your personalized roadmap..." />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-t border-border bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-5 rounded-lg bg-card border border-border"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-accent mb-3">
                  <feature.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
