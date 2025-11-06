import { supabase } from '../lib/supabase';
import { getFallbackRoadmap } from '../data/fallbackRoadmaps';

export async function fetchRoadmapByRole(role) {
  try {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .ilike('role', role)
      .maybeSingle();

    if (error) {
      console.error('Error fetching roadmap:', error);
      return getFallbackRoadmapData(role);
    }

    if (!data) {
      return getFallbackRoadmapData(role);
    }

    return data;
  } catch (error) {
    console.error('Exception fetching roadmap:', error);
    return getFallbackRoadmapData(role);
  }
}

function getFallbackRoadmapData(role) {
  const fallback = getFallbackRoadmap(role);

  if (!fallback) {
    return null;
  }

  return {
    id: 'fallback-' + role.toLowerCase().replace(/\s+/g, '-'),
    role: fallback.role,
    description: fallback.description,
    steps: fallback.steps,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

export async function getUserProgress(roadmapId) {
  try {
    const localProgress = localStorage.getItem(`progress-${roadmapId}`);
    if (localProgress) {
      return JSON.parse(localProgress);
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('completed_steps')
      .eq('user_id', user.id)
      .eq('roadmap_id', roadmapId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user progress:', error);
      return [];
    }

    return (data && data.completed_steps) || [];
  } catch (error) {
    console.error('Exception fetching user progress:', error);
    return [];
  }
}

export async function saveUserProgress(roadmapId, completedSteps) {
  try {
    localStorage.setItem(`progress-${roadmapId}`, JSON.stringify(completedSteps));

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        roadmap_id: roadmapId,
        completed_steps: completedSteps,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,roadmap_id'
      });

    if (error) {
      console.error('Error saving user progress:', error);
    }
  } catch (error) {
    console.error('Exception saving user progress:', error);
  }
}

export async function getAllRoadmaps() {
  try {
    const { data, error } = await supabase
      .from('roadmaps')
      .select('*')
      .order('role');

    if (error) {
      console.error('Error fetching all roadmaps:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exception fetching all roadmaps:', error);
    return [];
  }
}