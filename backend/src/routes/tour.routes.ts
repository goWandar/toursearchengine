import { Request, Response, Router } from "express";
import { TourService } from "../services/tour.service";
import { responseHandler } from "../utils/responseHandler";

const router: Router = Router();

router.get("/tours", async (req: Request, res: Response) => {
  const result = await TourService.getAllTours();

  responseHandler(res, result, "GET");
});

export default router;
