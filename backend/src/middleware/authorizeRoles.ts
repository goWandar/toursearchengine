import { Request, Response, NextFunction } from 'express';
import { User } from '../types/types';

// Role-Based Access Control (RBAC) guard for Express routes. It ensures that only users with specific roles (like "ADMIN" or "USER") can access a given route.

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (!user) {
      res.status(403).json({ error: 'Access denied: no role provided' });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({
        error: 'Access denied: insufficient permissions',
      });
      return;
    }

    next();
  };
};
