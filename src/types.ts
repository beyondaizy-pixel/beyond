// Core domain types for the BEYOND learning ecosystem

export type TopicLevel = 'Foundational' | 'Applied' | 'Advanced';
export type ProgressState = 'Not Started' | 'In Progress' | 'Paused' | 'Review' | 'Mastered';
export type LearningMode = 'Learn' | 'Practice' | 'Test' | 'Explore';

// Topic represents a discrete unit of knowledge
export interface Topic {
  id: string;
  title: string;
  family: string; // e.g., 'Mathematics', 'Physics', 'Computer Science'
  level: TopicLevel;
  summary: string;
  description?: string;
  prerequisites?: string[]; // Topic IDs
  related?: string[]; // Topic IDs for cross-domain connections
  estimatedHours?: number;
}

// LearningTrack is a curated sequence of topics with progress tracking
export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  topics: string[]; // Ordered array of topic IDs
  curriculum?: string; // e.g., 'CBSE', 'ICSE', 'IB', 'AP'
  grade?: number;
  subject?: string;
  createdAt: Date;
  updatedAt: Date;
}

// StudentProgress tracks individual learning state
export interface StudentProgress {
  trackId: string;
  topicId: string;
  state: ProgressState;
  completionPercent: number; // 0-100
  notesCount: number;
  mistakesCount: number;
  lastReviewedAt?: Date;
  nextReviewDate?: Date; // For spaced repetition
  timeSpent: number; // In minutes
}

// Note represents student's external memory (rough notes, captured material, etc.)
export interface StudentNote {
  id: string;
  trackId: string;
  topicId: string;
  type: 'rough' | 'captured' | 'concept-map' | 'question' | 'idea';
  content: string; // Markdown or text
  attachments?: string[]; // File paths or URLs
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  isProcessed: boolean; // Whether AI has summarized/linked it
}

// Practice record for tracking question attempts
export interface PracticeAttempt {
  id: string;
  trackId: string;
  topicId: string;
  questionId: string; // Will be generated or seeded later
  isCorrect: boolean;
  timeSpent: number; // In seconds
  attemptNumber: number;
  hintsUsed: number;
  explanation?: string; // Why it was wrong
  attemptedAt: Date;
}

// StudentSession represents a discrete learning session
export interface StudentSession {
  id: string;
  trackId: string;
  mode: LearningMode;
  startedAt: Date;
  endedAt?: Date;
  topicsVisited: string[];
  notesCreated: number;
  practiceAttempts: number;
  focusScore?: number; // 0-100, how focused was the session
}

// StudentProfile aggregates progress across all tracks
export interface StudentProfile {
  id: string;
  name: string;
  tracks: LearningTrack[];
  progress: Record<string, StudentProgress>; // Keyed by 'trackId:topicId'
  notes: StudentNote[];
  sessions: StudentSession[];
  preferences: {
    curriculum?: string;
    grade?: number;
    rigidityBar: number; // 0-100: balance between curriculum and exploration
    preferredPracticeMode?: LearningMode;
    learningStyle?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Knowledge library seed structure (for 330-topic foundation)
export interface KnowledgeLibrary {
  topics: Topic[];
  families: Record<string, string[]>; // Family name -> Topic IDs
  graph?: {
    prerequisites: Record<string, string[]>; // Topic ID -> Prerequisite Topic IDs
    related: Record<string, string[]>; // Topic ID -> Related Topic IDs
  };
  lastUpdated: Date;
}
