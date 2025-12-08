import { logger } from '../../utils/logger.js';
import type { QuizStage } from '@prisma/client';
import type { QuizSubmissionRequest, QuizResults } from '../../types/quiz.types.js';
import { ServiceResponse } from '../../types/shared.types.js';
import { prisma } from '../../db/prisma.js';
import { handlePrismaRequestError } from '../../utils/errorHandler.js';
import { generateQuizResults } from './helpers/quiz.helpers.js'; // Add this import

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
            where: { isActive: true },
            orderBy: { orderIndex: 'asc' },
            include: {
              options: {
                where: { isActive: true },
                orderBy: { orderIndex: 'asc' },
              },
            },
          },
        },
      });

      if (!stage) return { success: false, error: 'Resource not found.' };
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
  ): Promise<ServiceResponse<{ responseId: number; results: QuizResults }>> {
    logger.info(
      `[QuizService] Submitting quiz - Stage: ${submission.stageId}, User: ${userId || 'anonymous'}`,
    );

    try {
      // ✅ Generate quiz results with persona and recommendations
      const { results, personaId } = await generateQuizResults(submission);

      // Save quiz response
      const response = await prisma.quizResponse.create({
        data: {
          userId: userId || null,
          sessionId: sessionId,
          stageId: submission.stageId,
          confidenceLevel: submission.confidence || null,
          quizSelections: JSON.parse(JSON.stringify(submission.answers)),
          resultsJson: JSON.parse(JSON.stringify(results)), // Save full results
          personaId: personaId, // Save matched persona
        },
      });

      // Save individual answers
      await prisma.quizAnswer.createMany({
        data: submission.answers.map((answer) => ({
          responseId: response.id,
          questionId: answer.questionId,
          selectedOption: answer.optionId,
        })),
      });

      logger.success(
        `[QuizService] Quiz response saved: ${response.id} with persona: ${personaId || 'none'}`,
      );

      return {
        success: true,
        data: {
          responseId: response.id,
          results: results, // ✅ Return full results, not just answers
        },
      };
    } catch (error) {
      logger.error('[QuizService] Failed to submit quiz answers:', error);
      return handlePrismaRequestError(error, 'submitting quiz answers', 'QuizService');
    }
  },
};
