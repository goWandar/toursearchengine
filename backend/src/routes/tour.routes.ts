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

// Get tours by experience ID
router.get('/tours/experience/:experienceId', async (req: Request, res: Response) => {
  await TourService.getToursByExperienceId(req, res);
});


// Get park & country search suggestions
router.get('/tours/search-items', async (req: Request, res: Response) => {
  await TourService.getSearchItems(req, res);
});

// Get parks by country name
router.get('/parks/:countryName', async (req: Request, res: Response) => {
  await TourService.getParksByCountryName(req, res);
});

// Get experiences
router.get('/experiences', async (req: Request, res: Response) => {
  await TourService.getExperiences(req, res);
});


export default router;
