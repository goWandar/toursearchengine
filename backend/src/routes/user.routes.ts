import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { responseHandler } from "../utils/responseHandler";
import { SupabaseProvider } from "../providers/supabase.provider";

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

// POST User Sign In
router.post("/user/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    // Sign in via Supabase Auth
    const { data, error } = await SupabaseProvider.signIn(email, password);

    if (error || !data?.session?.access_token) {
        res.status(400).json({ error: error?.message || "Signin failed" });
        return;
    }

    const user = data.user;
    const accessToken = data.session.access_token;

    const result = {
        success: true,
        data: {
            id: user.id,
            email: user.email,
            accessToken,
        },
    };

    responseHandler(res, result, "POST");
});

export default router;
