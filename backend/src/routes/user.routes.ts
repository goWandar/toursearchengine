import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";
import { SupabaseProvider } from "../providers/supabase.provider";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// POST User Sign Up
router.post("/user/signup", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // Create user via Supabase Auth
    const { data, error } = await SupabaseProvider.signUp(email, password);

    if (error || !data?.user?.id) {
        res.status(400).json({ error: error?.message || "Signup failed" });
        return;
    }

    const supabaseUserId = data.user?.id;

    if (!supabaseUserId) {
        res.status(400).json({ error: "Signup failed: User ID is null" });
        return;
    }

    // Store userdata
    const result = await UserService.createUser(supabaseUserId, name, email);

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
