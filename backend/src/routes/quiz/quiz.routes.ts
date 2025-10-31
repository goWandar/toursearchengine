import { Request, Response, Router } from 'express';

import { QuizService } from '../../services/quiz/quiz.service.js';
import { responseHandler } from '../../utils/responseHandler.js';

const router = Router();

// GET stages of the quiz
router.get('/quiz/stages', async (_req: Request, res: Response) => {
  const result = await QuizService.getQuizStages();

  return responseHandler(res, result, 'GET');
});

export default router;
