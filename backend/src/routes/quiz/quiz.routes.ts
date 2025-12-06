import { Request, Response, Router } from 'express';

import { QuizService } from '../../services/quiz/quiz.service.js';
import { responseHandler } from '../../utils/responseHandler.js';

import { logger } from '../../utils/logger.js';

const router = Router();

// GET stages of the quiz
router.get('/quiz/stages/:stageId', async (req: Request, res: Response) => {
  const stageId = Number(req.params.stageId);

  if (isNaN(stageId)) {
    logger.warn('[QuizController] Invalid stageId:', req.params.stageId);
    return res.status(400).json({ success: false, error: 'Invalid stage ID' });
  }

  const result = await QuizService.getQuizStage(stageId);

  return responseHandler(res, result, 'GET');
});

// POST submit quiz answers
router.post('/quiz/submit', async (req: Request, res: Response) => {
  const submission = req.body;
  const sessionId = req.headers['x-session-id'] as string | undefined;
  const userId = req.user?.id;

  // Validate inputs
  if (!submission.stageId) {
    logger.warn('[QuizRoutes] Submission missing stageId');
    return res.status(400).json({ success: false, error: 'Stage ID is required' });
  }

  if (!submission.answers || submission.answers.length === 0) {
    logger.warn('[QuizRoutes] Submission contains no answers');
    return res.status(400).json({ success: false, error: 'At least one answer is required' });
  }

  if (!sessionId) {
    logger.warn('[QuizRoutes] Submission missing sessionId');
    return res.status(400).json({ success: false, error: 'Session ID is required' });
  }

  const result = await QuizService.submitQuizAnswers(submission, sessionId, userId);

  return responseHandler(res, result, 'POST');
});

export default router;
