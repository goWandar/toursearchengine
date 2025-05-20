import { Request, Response, Router } from 'express';

import { responseHandler } from '../utils/responseHandler';
import { TourService } from '../services/tour.service';

const router: Router = Router();

router.get('/tours', async (req: Request, res: Response) => {
  const result = await TourService.getAllTours(req, res);
  responseHandler(res, result, 'GET');
});

export default router;
