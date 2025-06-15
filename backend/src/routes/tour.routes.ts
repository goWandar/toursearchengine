import { Request, Response, Router } from 'express';

import { responseHandler } from '../utils/responseHandler.js';
import { TourService } from '../services/tour.service.js';
import { TourFilterInput } from '../types/types.js';

const router: Router = Router();

router.get('/tours', async (req: Request, res: Response) => {
  const parsedLimit = parseInt(req.query.limit as string);
  const cursor = req.query.cursor as string | undefined;

  // Default limit + clamp limit
  const limit = Math.max(1, Math.min(isNaN(parsedLimit) ? 8 : parsedLimit, 100));

  // Construct TourFilterInput from query params
  const filters: TourFilterInput = {
    location: req.query.location ? String(req.query.location) : undefined,
    priceMin: req.query.priceMin ? Number(req.query.priceMin) : undefined,
    priceMax: req.query.priceMax ? Number(req.query.priceMax) : undefined,
    daysMin: req.query.daysMin ? Number(req.query.daysMin) : undefined,
    daysMax: req.query.daysMax ? Number(req.query.daysMax) : undefined,
    accommodationType: req.query.accommodationType
      ? String(req.query.accommodationType)
      : undefined,
    // Add more fields from TourFilterInput if needed
  };

  const result = await TourService.getFilteredTours(limit, cursor, filters);
  responseHandler(res, result, 'GET');
});

export default router;
