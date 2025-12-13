export interface QuizAnswers {
  exploring: Record<string, string | string[]>;
  narrowing: Record<string, string | string[]>;
  timing: Record<string, string | string[]>;
}

export interface QuizQuestion {
  id: string;
  title: string;
  question: string;
  type: 'single' | 'multiple' | 'range';
  options?: QuizOption[];
  required: boolean;
}

export interface QuizOption {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: string;
  nudge?: string;
}

export interface UserPersona {
  travelStyle: string;
  budgetRange: string;
  duration: string;
  preferences: string[];
}

export interface SafariRecommendation {
  id: string;
  name: string;
  location: string;
  matchScore: number;
  reasons: string[];
  highlights: string[];
  price?: string;
  duration?: string;
  image?: string;
}

export interface QuizStage {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  completed: boolean;
}

export interface QuizProgress {
  currentStage: string;
  completedStages: string[];
  totalStages: number;
  percentage: number;
}

export interface QuizState {
  answers: QuizAnswers;
  progress: QuizProgress;
  currentQuestionIndex: number;
  isComplete: boolean;
}

export type QuizStageType = 'exploring' | 'narrowing' | 'timing';

export interface QuizContext {
  state: QuizState;
  updateAnswer: (stage: QuizStageType, questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToStage: (stage: QuizStageType) => void;
  resetQuiz: () => void;
}
