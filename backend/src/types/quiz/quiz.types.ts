// INPUT TYPES

export interface QuizAnswer {
  questionId: number;
  optionId: number;
  tagId: number;
  importance: 1 | 2 | 3 | 4 | 5;
}

export interface QuizSubmission {
  stageId: number;
  answers: QuizAnswer[];
}
