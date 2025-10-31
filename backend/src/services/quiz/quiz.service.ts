import { logger } from '../../utils/logger.js';

import type { QuizStage } from '@prisma/client';
import { ServiceResponse } from '../../types/shared.types.js';

import { prisma } from '../../db/prisma.js';
import { handlePrismaRequestError } from '../../utils/errorHandler.js';

export const QuizService = {
  initQuiz: () => {
    logger.info('[QuizService] Quiz service initialized.');
  },

  async getQuizStage(stageId: number): Promise<ServiceResponse<QuizStage | null>> {
    try {
      const stage = await prisma.quizStage.findUnique({
        where: { id: stageId },
        include: {
          questions: {
            orderBy: { orderIndex: 'asc' },
            include: {
              options: { orderBy: { orderIndex: 'asc' } },
            },
          },
        },
      });

      if (!stage) return { success: false, error: 'Stage not found' };

      return { success: true, data: stage };
    } catch (error) {
      logger.error('[QuizService] Failed to fetch quiz stage:', error);
      return handlePrismaRequestError(error, 'fetching quiz stage', 'QuizService');
    }
  },
};
