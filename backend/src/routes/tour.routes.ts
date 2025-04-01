import { Request, Response, Router } from "express";
import { TourService } from "../services/tour.service";
import { responseHandler } from "../utils/responseHandler";
import { Tour } from "@prisma/client";
import { flushCompileCache } from "module";

const router: Router = Router();

router.get("/tours", async (req: Request, res: Response) => {
  const result = await TourService.getAllTours(req, res);

  responseHandler(res, result, "GET");
});

export default router;
