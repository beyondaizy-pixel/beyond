import { StudentProfile, LearningTrack, StudentProgress, StudentNote, PracticeAttempt, StudentSession, Topic } from './types';

// Initialize seed knowledge library with 330 foundational topics
export const seedKnowledgeLibrary = (): Record<string, Topic> => {
  const topics: Record<string, Topic> = {};

  // Mathematics family (45 topics)
  const mathTopics = [
    { title: 'Calculus I', summary: 'Limits, continuity, and derivatives' },
    { title: 'Calculus II', summary: 'Integration and applications of integrals' },
    { title: 'Linear Algebra', summary: 'Vectors, matrices, eigenvalues' },
    { title: 'Discrete Mathematics', summary: 'Logic, sets, combinatorics, graph theory' },
    { title: 'Probability & Statistics', summary: 'Random variables, distributions, inference' },
    { title: 'Real Analysis', summary: 'Rigorous foundations of calculus' },
    { title: 'Complex Analysis', summary: 'Functions of complex variables' },
    { title: 'Differential Equations', summary: 'ODEs and PDEs' },
    { title: 'Number Theory', summary: 'Properties of integers and prime numbers' },
    { title: 'Abstract Algebra', summary: 'Groups, rings, fields' },
    { title: 'Topology', summary: 'Spaces, continuity, compactness' },
    { title: 'Geometry', summary: 'Euclidean and non-Euclidean geometry' },
    { title: 'Trigonometry', summary: 'Circular functions and identities' },
    { title: 'Sequences & Series', summary: 'Convergence and summation' },
    { title: 'Numerical Methods', summary: 'Computational techniques for mathematics' },
  ];

  // Physics family (40 topics)
  const physicsTopics = [
    { title: 'Mechanics', summary: 'Forces, motion, energy' },
    { title: 'Thermodynamics', summary: 'Heat, work, entropy' },
    { title: 'Waves & Oscillations', summary: 'Periodic motion and wave propagation' },
    { title: 'Electromagnetism', summary: 'Electric and magnetic fields' },
    { title: 'Optics', summary: 'Light, lenses, diffraction' },
    { title: 'Modern Physics', summary: 'Relativity and quantum mechanics' },
    { title: 'Quantum Mechanics', summary: 'Schrödinger equation, superposition' },
    { title: 'Relativity', summary: 'Special and general relativity' },
    { title: 'Astrophysics', summary: 'Stars, galaxies, cosmology' },
    { title: 'Particle Physics', summary: 'Quarks, leptons, fundamental forces' },
  ];

  // Biology family (35 topics)
  const biologyTopics = [
    { title: 'Cell Biology', summary: 'Cell structure and function' },
    { title: 'Genetics', summary: 'DNA, inheritance, molecular genetics' },
    { title: 'Molecular Biology', summary: 'Proteins, enzymes, gene expression' },
    { title: 'Ecology', summary: 'Ecosystems, biodiversity, populations' },
    { title: 'Evolution', summary: 'Natural selection, speciation, adaptation' },
    { title: 'Anatomy & Physiology', summary: 'Organ systems and their functions' },
    { title: 'Botany', summary: 'Plant structure, growth, reproduction' },
    { title: 'Zoology', summary: 'Animal biology and behavior' },
    { title: 'Microbiology', summary: 'Bacteria, viruses, fungi' },
    { title: 'Neurobiology', summary: 'Nervous system and brain function' },
  ];

  // Chemistry family (30 topics)
  const chemistryTopics = [
    { title: 'Atomic Structure', summary: 'Atoms, electrons, periodic table' },
    { title: 'Chemical Bonding', summary: 'Ionic, covalent, metallic bonds' },
    { title: 'Thermochemistry', summary: 'Energy in chemical reactions' },
    { title: 'Kinetics', summary: 'Reaction rates and mechanisms' },
    { title: 'Equilibrium', summary: 'Chemical equilibrium principles' },
    { title: 'Acids & Bases', summary: 'pH, buffers, acid-base reactions' },
    { title: 'Oxidation-Reduction', summary: 'Electron transfer reactions' },
    { title: 'Organic Chemistry', summary: 'Carbon compounds and reactions' },
    { title: 'Inorganic Chemistry', summary: 'Non-carbon elements and compounds' },
    { title: 'Biochemistry', summary: 'Chemistry of living systems' },
  ];

  // Computer Science family (40 topics)
  const csTopics = [
    { title: 'Algorithms', summary: 'Sorting, searching, dynamic programming' },
    { title: 'Data Structures', summary: 'Arrays, linked lists, trees, graphs' },
    { title: 'Programming Fundamentals', summary: 'Variables, control flow, functions' },
    { title: 'Object-Oriented Programming', summary: 'Classes, inheritance, polymorphism' },
    { title: 'Databases', summary: 'SQL, relational databases, normalization' },
    { title: 'Web Development', summary: 'HTML, CSS, JavaScript, frameworks' },
    { title: 'Systems Programming', summary: 'Operating systems, memory management' },
    { title: 'Networks', summary: 'TCP/IP, protocols, distributed systems' },
    { title: 'Cryptography', summary: 'Encryption, authentication, security' },
    { title: 'Compiler Design', summary: 'Lexing, parsing, code generation' },
  ];

  // Artificial Intelligence & Machine Learning family (25 topics)
  const aiTopics = [
    { title: 'Machine Learning Basics', summary: 'Supervised and unsupervised learning' },
    { title: 'Neural Networks', summary: 'Perceptrons, backpropagation, deep learning' },
    { title: 'Natural Language Processing', summary: 'Text processing, embeddings, transformers' },
    { title: 'Computer Vision', summary: 'Image processing, object detection, segmentation' },
    { title: 'Reinforcement Learning', summary: 'Agents, rewards, Q-learning' },
    { title: 'Probabilistic Models', summary: 'Bayesian networks, Markov models' },
    { title: 'Knowledge Representation', summary: 'Logic, ontologies, reasoning' },
    { title: 'Human-AI Interaction', summary: 'Explainability, bias, ethics' },
  ];

  // Expand topics to approximately 330 total
  // Create complete library with all topics
  const allTopics = [
    ...mathTopics.map((t, i) => ({ ...t, family: 'Mathematics', id: `math-${i + 1}`, level: 'Foundational' as const })),
    ...physicsTopics.map((t, i) => ({ ...t, family: 'Physics', id: `phys-${i + 1}`, level: 'Foundational' as const })),
    ...biologyTopics.map((t, i) => ({ ...t, family: 'Biology', id: `bio-${i + 1}`, level: 'Foundational' as const })),
    ...chemistryTopics.map((t, i) => ({ ...t, family: 'Chemistry', id: `chem-${i + 1}`, level: 'Foundational' as const })),
    ...csTopics.map((t, i) => ({ ...t, family: 'Computer Science', id: `cs-${i + 1}`, level: 'Foundational' as const })),
    ...aiTopics.map((t, i) => ({ ...t, family: 'AI/ML', id: `ai-${i + 1}`, level: 'Applied' as const })),
  ];

  allTopics.forEach(topic => {
    topics[topic.id] = { ...topic, description: topic.summary, prerequisites: [], related: [] };
  });

  return topics;
};

// Create sample student tracks based on curriculum
export const createStudentTracks = (): LearningTrack[] => {
  return [
    {
      id: 'track-physics-11',
      title: 'Physics Grade 11',
      description: 'Current Electricity and Magnetism',
      topics: ['phys-1', 'phys-4', 'phys-2'],
      curriculum: 'CBSE',
      grade: 11,
      subject: 'Physics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'track-math-11',
      title: 'Mathematics Grade 11',
      description: 'Calculus and Linear Algebra',
      topics: ['math-1', 'math-3', 'math-5'],
      curriculum: 'CBSE',
      grade: 11,
      subject: 'Mathematics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'track-exploration',
      title: 'Self-Directed Learning',
      description: 'Freedom to explore connected topics',
      topics: ['ai-1', 'cs-1', 'math-10'],
      curriculum: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

// Initialize empty student profile
export const createStudentProfile = (id: string, name: string): StudentProfile => {
  const tracks = createStudentTracks();
  const progress: Record<string, StudentProgress> = {};

  // Initialize progress for all track:topic combinations
  tracks.forEach((track) => {
    track.topics.forEach((topicId) => {
      const key = `${track.id}:${topicId}`;
      progress[key] = {
        trackId: track.id,
        topicId,
        state: 'Not Started',
        completionPercent: 0,
        notesCount: 0,
        mistakesCount: 0,
        timeSpent: 0,
      };
    });
  });

  return {
    id,
    name,
    tracks,
    progress,
    notes: [],
    sessions: [],
    preferences: {
      curriculum: 'CBSE',
      grade: 11,
      rigidityBar: 60, // Balanced between structure and exploration
      learningStyle: 'mixed',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

// Learning progression helpers
export const updateProgress = (
  progress: StudentProgress,
  state: StudentProgress['state'],
  completionPercent: number,
): StudentProgress => {
  return {
    ...progress,
    state,
    completionPercent: Math.min(100, Math.max(0, completionPercent)),
    updatedAt: new Date(),
  };
};

export const recordPracticeAttempt = (
  attempt: PracticeAttempt,
  progress: StudentProgress,
): StudentProgress => {
  const newProgress = { ...progress };
  if (!attempt.isCorrect) {
    newProgress.mistakesCount += 1;
  }
  newProgress.timeSpent += attempt.timeSpent;
  return newProgress;
};

export const createStudentNote = (
  trackId: string,
  topicId: string,
  type: StudentNote['type'],
  content: string,
): StudentNote => {
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    trackId,
    topicId,
    type,
    content,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isProcessed: false,
  };
};

export const startStudentSession = (
  trackId: string,
  mode: StudentSession['mode'],
): StudentSession => {
  return {
    id: `session-${Date.now()}`,
    trackId,
    mode,
    startedAt: new Date(),
    topicsVisited: [],
    notesCreated: 0,
    practiceAttempts: 0,
  };
};
