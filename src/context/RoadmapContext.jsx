import { createContext, useContext, useState } from 'react';

const RoadmapContext = createContext(undefined);

export function RoadmapProvider({ children }) {
  const [roadmapData, setRoadmapData] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());

  const toggleTopic = (topic) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topic)) {
        newSet.delete(topic);
      } else {
        newSet.add(topic);
      }
      return newSet;
    });
  };

  const clearCompleted = () => {
    setCompletedTopics(new Set());
  };

  return (
    <RoadmapContext.Provider value={{ roadmapData, setRoadmapData, completedTopics, toggleTopic, clearCompleted }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
