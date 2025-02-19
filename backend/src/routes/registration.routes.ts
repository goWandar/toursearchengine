import { Request, Response, Router } from "express";
import { RegistrationService } from "../services/registration.service";
const router = Router();

// POST register
router.post("/register", async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await RegistrationService.registerEmailForBeta(email);

    if (!result.success) {
        res.status(400).json({ error: result.error });
        return;
    }

    res.status(201).json({
        message: "Email registered successfully",
        data: result.data,
    });
});

export default router;
