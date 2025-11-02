export interface QuizAnswer {
  questionId: number;
  optionId: number;
  tagId: number;
  importance: 1 | 2 | 3 | 4 | 5;
}

export interface QuizSubmissionRequest {
  stageId: number;
  answers: QuizAnswer[];
  confidence?: 1 | 2 | 3 | 4 | 5;
}

export interface UserProfile {
  personaName: string;
  personaDescription: string;
  keyTraits: string[];
  selectedTags: Array<{
    category: string;
    tagKey: string;
    tagLabel: string;
    importance: number;
  }>;
}

export interface TourRecommendation {
  tourId: number;
  tourName: string;
  operator: string;
  matchPercentage: number;
  whyItFits: string[];
  highlights: string[];
  practicalDetails: {
    duration: string;
    priceRange: string;
    region: string;
  };
}

export interface QuizResults {
  userProfile: UserProfile;
  recommendations: TourRecommendation[];
  nextSteps: string[];
}
