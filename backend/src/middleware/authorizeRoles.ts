import { Request, Response, NextFunction } from 'express';
import { User } from '../types/types';

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (!user) {
      return res.status(403).json({ error: 'Access denied: no role provided' });
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
