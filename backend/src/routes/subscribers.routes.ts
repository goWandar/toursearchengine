import { Request, Response, Router } from "express";

import { responseHandler } from "../utils/responseHandler";
import { SubscribersService } from "../services/subscribers.service";

const router = Router();

// POST register
router.post("/subscribers", async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await SubscribersService.registerEmailForBeta(email);

    responseHandler(res, result, "POST");
});

export default router;
