import { Request, Response, NextFunction } from 'express';

// Role-Based Access Control (RBAC) guard for Express routes. It ensures that only users with specific roles (like "ADMIN" or "USER") can access a given route.

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(403).json({ error: 'Access denied: no role provided' });
      return;
    }

    if (!user.role || !roles.includes(user.role)) {
      res.status(403).json({
        error: 'Access denied: insufficient permissions',
      });
      return;
    }

    next();
  };
};
