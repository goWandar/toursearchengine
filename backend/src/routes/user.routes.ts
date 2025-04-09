import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// POST Create User
router.post("/user", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const result = await UserService.createUser(name, email);

    responseHandler(res, result, "POST");
});

// router.get(
//     "/user-auth-test",
//     authenticateToken,
//     async (req: Request, res: Response) => {
//         const user = req.user;
//         res.json({
//             message: "Authenticated route hit successfully!",
//             user,
//         });
//     }
// );

export default router;
