import { Request, Response, Router } from 'express';

import { QuizService } from '../../services/quiz/quiz.service.js';

const router = Router();

// GET stages of the quiz
router.get('/quiz/stages', async (_req: Request, res: Response) => {
  const stages = await QuizService.getQuizStages();

  return res.status(200).json(stages);
});

export default router;
