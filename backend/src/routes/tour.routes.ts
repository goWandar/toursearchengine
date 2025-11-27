import { Request, Response, Router } from 'express';

// import { responseHandler } from '../utils/responseHandler';
import { TourService } from '../services/tour.service.js';

const router: Router = Router();

// Get tours by country ID
router.get('/tours/country/:countryId', async (req: Request, res: Response) => {
  await TourService.getToursByCountryId(req, res);
});

// Get tours by park ID
router.get('/tours/park/:parkId', async (req: Request, res: Response) => {
  await TourService.getToursByParkId(req, res);
});


// Get park & country search suggestions
router.get('/tours/country-park/suggestions', async (req: Request, res: Response) => {
  await TourService.getAllParksAndCountries(req, res);
});

// Get parks by country name
router.get('/parks/:countryName', async (req: Request, res: Response) => {
  await TourService.getParksByCountryName(req, res);
});


export default router;
