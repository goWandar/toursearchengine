import { Request, Response, Router } from "express";
import { AdminService } from "../services/admin.service";
import { responseHandler } from "../utils/responseHandler";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// POST: Admin creates a user
router.post(
    "/admin/user",
    authenticateToken,
    async (req: Request, res: Response) => {
        const { id, name, email } = req.body;

        const result = await AdminService.adminCreateUser(id, name, email);
        responseHandler(res, result, "POST");
    }
);

// GET: Fetch single user by ID
router.get(
    "/admin/user/:id",
    authenticateToken,
    async (req: Request, res: Response) => {
        const userId = req.params.id;

        const result = await AdminService.getUserById(userId);
        responseHandler(res, result, "GET");
    }
);

// GET: Fetch all users
router.get(
    "/admin/users",
    authenticateToken,
    async (req: Request, res: Response) => {
        const result = await AdminService.getUsers();
        responseHandler(res, result, "GET");
    }
);

export default router;
