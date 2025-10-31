import { logger } from '../../utils/logger.js';

import type { QuizStage } from '@prisma/client';
import { ServiceResponse } from '../../types/shared.types.js';

import { prisma } from '../../db/prisma.js';
import { handlePrismaRequestError } from '../../utils/errorHandler.js';

export const QuizService = {
  initQuiz: () => {
    logger.info('[QuizService] Quiz service initialized.');
  },

  async getQuizStages(): Promise<ServiceResponse<QuizStage[]>> {
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
