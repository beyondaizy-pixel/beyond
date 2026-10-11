import React, { createContext, useContext, useState, useCallback } from 'react';
import { StudentProfile, LearningTrack, StudentProgress, Topic } from '../types';
import { seedKnowledgeLibrary, createStudentProfile } from './studentData';

interface StudentContextType {
  profile: StudentProfile;
  topics: Record<string, Topic>;
  updateTrackProgress: (trackId: string, topicId: string, progress: Partial<StudentProgress>) => void;
  addTrackNote: (trackId: string, topicId: string, content: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile] = useState<StudentProfile>(() => createStudentProfile('student-1', 'Student'));
  const [topics] = useState<Record<string, Topic>>(() => seedKnowledgeLibrary());

  const updateTrackProgress = useCallback(
    (trackId: string, topicId: string, updates: Partial<StudentProgress>) => {
      const key = `${trackId}:${topicId}`;
      if (profile.progress[key]) {
        profile.progress[key] = { ...profile.progress[key], ...updates };
      }
    },
    [profile.progress],
  );

  const addTrackNote = useCallback(
    (trackId: string, topicId: string, content: string) => {
      const note = {
        id: `note-${Date.now()}`,
        trackId,
        topicId,
        type: 'rough' as const,
        content,
        tags: [] as string[],
        createdAt: new Date(),
        updatedAt: new Date(),
        isProcessed: false,
      };
      profile.notes.push(note);
    },
    [profile.notes],
  );

  const value: StudentContextType = {
    profile,
    topics,
    updateTrackProgress,
    addTrackNote,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
