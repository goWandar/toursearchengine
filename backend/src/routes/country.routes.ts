import { Request, Response, Router } from 'express';

// import { responseHandler } from '../utils/responseHandler';
import { CountryService } from '../services/country.service.js';

const router: Router = Router();

router.get('/countries', async (req: Request, res: Response) => {
  await CountryService.getAllCountries(req, res);
});

export default router;