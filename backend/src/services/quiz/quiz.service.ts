import { prisma } from '../../db/prisma.js';
import { logger } from '../../utils/logger.js';

export const QuizService = {
  // Add quiz service
  initQuiz: () => {
    logger.info('[QuizService] Quiz service initialized.');
  },

  async getQuizStages() {
    logger.info('[QuizService] Fetching quiz stages.');
    try {
      return await prisma.quizStage.findMany({
        orderBy: { orderIndex: 'asc' },
        include: {
          questions: {
            orderBy: { orderIndex: 'asc' },
            include: {
              options: { orderBy: { orderIndex: 'asc' } },
            },
          },
        },
      });
    } catch (error) {
      console.error('getQuizStages error:', error);
      throw new Error('Failed to fetch quiz stages');
    }
  },
};
