import { Request, Response, Router } from 'express';

// import { responseHandler } from '../utils/responseHandler';
import { ParkService } from '../services/park.service.js';

const router: Router = Router();

router.get('/parks', async (req: Request, res: Response) => {
  await ParkService.getAllParks(req, res);
});

export default router;