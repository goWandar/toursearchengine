import { Request, Response, Router } from "express";
import { AdminService } from "../services/admin.service";
import { responseHandler } from "../utils/responseHandler";
const router = Router();

// POST Create User
router.post("/user", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const result = await AdminService.adminCreateUser(name, email);

    responseHandler(res, result, "POST");
});

// GET a Single User by ID
router.get("/user/:id", async (req: Request, res: Response) => {
    const userId = req.params.id;
    const result = await AdminService.getUserById(userId);

    responseHandler(res, result, "GET");
});

// GET All Users
router.get("/users", async (req: Request, res: Response) => {
    const result = await AdminService.getUsers();

    responseHandler(res, result, "GET");
});

export default router;
