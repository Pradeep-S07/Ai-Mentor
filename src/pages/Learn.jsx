import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, BookOpen, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicroSkillCard } from '@/components/MicroSkillCard';
import { SubSkillCard } from '@/components/SubSkillCard';
import { ProjectSubmission, ProjectResult } from '@/components/ProjectSubmission';
import { roadmapApi, microSkillsApi, projectApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function Learn() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const skill = searchParams.get('skill') || '';

  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState(null);
  const [activeSubSkill, setActiveSubSkill] = useState(null);
  const [microSkills, setMicroSkills] = useState([]);
  const [loadingMicroSkills, setLoadingMicroSkills] = useState(false);
  const [completedMicroSkills, setCompletedMicroSkills] = useState(new Set());
  const [showProject, setShowProject] = useState(false);
  const [project, setProject] = useState(null);
  const [projectResult, setProjectResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load roadmap
  useEffect(() => {
    if (!skill) {
      navigate('/');
      return;
    }
    loadRoadmap();
  }, [skill]);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      const data = await roadmapApi.generateRoadmap(skill);
      setRoadmap(data);
      if (data.subSkills?.length > 0) {
        setActiveSubSkill(data.subSkills[0]);
        loadMicroSkills(data.subSkills[0]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load roadmap', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const loadMicroSkills = async (subSkill) => {
    try {
      setLoadingMicroSkills(true);
      setShowProject(false);
      setProjectResult(null);
      const data = await microSkillsApi.getMicroSkills(skill, subSkill.name);
      setMicroSkills(data.microSkills || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load content', variant: 'destructive' });
    } finally {
      setLoadingMicroSkills(false);
    }
  };

  const handleSubSkillClick = (subSkill) => {
    setActiveSubSkill(subSkill);
    loadMicroSkills(subSkill);
  };

  const handleMicroSkillComplete = (microSkillId) => {
    setCompletedMicroSkills(prev => new Set([...prev, microSkillId]));
    toast({ title: 'Great job!', description: 'Topic marked as completed' });
  };

  const allMicroSkillsCompleted = microSkills.length > 0 && 
    microSkills.every(ms => completedMicroSkills.has(ms.id));

  const handleShowProject = async () => {
    try {
      const data = await projectApi.getProject(activeSubSkill.name);
      setProject(data.project);
      setShowProject(true);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load project', variant: 'destructive' });
    }
  };

  const handleSubmitProject = async (submission) => {
    try {
      setSubmitting(true);
      const result = await projectApi.submitProject({
        skill,
        subSkill: activeSubSkill.name,
        ...submission,
      });
      setProjectResult(result);
    } catch (error) {
      toast({ title: 'Error', description: 'Submission failed', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{roadmap?.skill}</h1>
            <p className="text-sm text-muted-foreground">{roadmap?.domain}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[300px,1fr] gap-6">
          {/* Sidebar - Sub Skills */}
          <div className="space-y-3">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learning Path
            </h2>
            {roadmap?.subSkills?.map((subSkill, index) => (
              <SubSkillCard
                key={subSkill.id}
                subSkill={subSkill}
                isActive={activeSubSkill?.id === subSkill.id}
                isUnlocked={index === 0 || true}
                isCompleted={false}
                completedMicroSkills={microSkills.filter(ms => completedMicroSkills.has(ms.id)).length}
                totalMicroSkills={microSkills.length}
                onClick={handleSubSkillClick}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {loadingMicroSkills ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : showProject ? (
              projectResult ? (
                <ProjectResult
                  result={projectResult}
                  onContinue={() => { setShowProject(false); setProjectResult(null); }}
                  onRetry={() => setProjectResult(null)}
                />
              ) : (
                <ProjectSubmission
                  project={project}
                  onSubmit={handleSubmitProject}
                  isSubmitting={submitting}
                />
              )
            ) : (
              <>
                {microSkills.map(ms => (
                  <MicroSkillCard
                    key={ms.id}
                    microSkill={ms}
                    isCompleted={completedMicroSkills.has(ms.id)}
                    onComplete={handleMicroSkillComplete}
                  />
                ))}
                {allMicroSkillsCompleted && (
                  <Button onClick={handleShowProject} className="w-full" size="lg">
                    <FolderGit2 className="h-5 w-5 mr-2" />
                    Start Project Assignment
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
