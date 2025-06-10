import { Request, Response, NextFunction } from 'express';
import { prisma } from '../db/prisma';

// Role-Based Access Control (RBAC) guard for Express routes.
// It ensures that only users with specific roles (like "ADMIN" or "USER") can access a given route.

export const authorizeRoles = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. get the authenticated user’s ID (sub) from the JWT token payload
    const userId = typeof req.user?.sub === 'string' ? req.user.sub : undefined;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: no user ID in token' });
      return;
    }

    try {
      // 2. check if user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        res.status(404).json({ error: 'User not found in database' });
        return;
      }

      // 3. verify the role
      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ error: 'Access denied: insufficient permissions' });
        return;
      }

      if (user.role !== 'USER' && user.role !== 'ADMIN') {
        res.status(403).json({ error: 'Invalid role' });
        return;
      }

      // 4. attach role to the request
      req.user = {
        sub: user.id,
        email: user.email ?? '',
        role: user.role,
      };

      next();
    } catch (error) {
      console.error('Error in authorizeRoles middleware:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};
