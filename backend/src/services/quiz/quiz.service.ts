import { logger } from '../../utils/logger.js';

import type { QuizStage } from '@prisma/client';
import type { QuizSubmissionRequest, QuizAnswer } from '../../types/quiz.types.js';
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

  async submitQuizAnswers(
    submission: QuizSubmissionRequest,
    sessionId: string,
    userId?: number,
  ): Promise<ServiceResponse<{ responseId: number; results: QuizAnswer[] } | null>> {
    logger.info(
      `[QuizService] Submitting quiz for stage ${submission.stageId} (userId: ${userId || 'anonymous'})`,
    );
    try {
      // const quizResults = await generateQuizResults(submission);
      // const personaId = await findMatchingPersona(quizResults);

      // Save quiz response
      const results = await prisma.quizResponse.create({
        data: {
          userId: userId || null,
          sessionId: sessionId,
          stageId: submission.stageId,
          confidenceLevel: submission.confidence || null,
          quizSelections: JSON.parse(JSON.stringify(submission.answers)),
        },
      });

      // Save individual answers
      await prisma.quizAnswer.createMany({
        data: submission.answers.map((answer) => ({
          responseId: results.id,
          questionId: answer.questionId,
          selectedOption: answer.optionId,
        })),
      });

      logger.success(`[QuizService] Quiz response saved: ${results.id}`);

      return {
        success: true,
        data: {
          responseId: results.id,
          results: submission.answers,
        },
      };
    } catch (error) {
      logger.error('[QuizService] Failed to submit quiz answers:', error);
      return handlePrismaRequestError(error, 'submitting quiz answers', 'QuizService');
    }
  },
};
