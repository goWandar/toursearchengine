import { Request, Response, Router } from 'express';

// import { responseHandler } from '../utils/responseHandler';
import { TourService } from '../services/tour.service.js';

const router: Router = Router();

router.get('/tours/country/:countryId', async (req: Request, res: Response) => {
  await TourService.getToursByCountryId(req, res);
});

router.get('/tours/park/:parkId', async (req: Request, res: Response) => {
  await TourService.getToursByParkId(req, res);
});

export default router;
