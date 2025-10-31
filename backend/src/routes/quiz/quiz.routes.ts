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

export default router;
