import { prisma } from '../../db/prisma.js';
import { logger } from '../../utils/logger.js';

import { handlePrismaRequestError } from '../../utils/errorHandler.js';

import { ServiceResponse } from '../../types/shared.types.js';

export const QuizService = {
  initQuiz: () => {
    logger.info('[QuizService] Quiz service initialized.');
  },

  async getQuizStages(): Promise<ServiceResponse<any>> {
    logger.info('[QuizService] Fetching quiz stages.');

    try {
      const stages = await prisma.quizStage.findMany({
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

      logger.success(`[QuizService] Successfully fetched ${stages.length} quiz stages.`);

      return { success: true, data: stages };
    } catch (error) {
      logger.error('[QuizService] Failed to fetch quiz stages:', error);
      return handlePrismaRequestError(error, 'fetching quiz stages', 'QuizService');
    }
  },
};
