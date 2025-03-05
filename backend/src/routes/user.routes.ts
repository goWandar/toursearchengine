import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";
const router = Router();

// POST Create User
router.post("/user", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const result = await UserService.createUser(name, email);

    responseHandler(res, result, "POST");
});

export default router;
