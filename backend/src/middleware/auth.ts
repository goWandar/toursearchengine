import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET as string;

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        res.status(401).json({ error: "Access denied: no token provide" });
        return;
    }

    try {
        jwt.verify(token, supabaseJwtSecret, (err, user) => {
            if (err) return res.status(403).json({ error: "Invalid token" });
            req.user = user;
            next();
        });
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
}
