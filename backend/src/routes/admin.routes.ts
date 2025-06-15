import { Request, Response, Router } from 'express';

import { AdminService } from '../services/admin.service.js';

import { authenticateToken } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

import { getUserEmailFromRequest } from '../utils/authHelpers.js';
import { responseHandler } from '../utils/responseHandler.js';
import { logger } from '../utils/logger.js';

const router = Router();

// POST: Admin creates a user
router.post(
  '/admin/create-user',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const { name, email, role } = req.body;
    const adminEmail = getUserEmailFromRequest(req);

    const result = await AdminService.adminCreateUser(name, email, role);

    if (result.success) {
      logger.info(
        `[AdminRoute] Admin (${adminEmail}) created user: ${email} (id: ${result.data.id})`,
      );
    }

    responseHandler(res, result, 'POST');
  },
);

// GET: Admin fetches a single user by ID
router.get(
  '/admin/user/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const adminEmail = getUserEmailFromRequest(req);

    const result = await AdminService.getUserById(userId);

    if (result.success) {
      logger.info(`[AdminRoute] Admin (${adminEmail}) retrieved user with ID: ${userId}`);
    } else {
      logger.warn(
        `[AdminRoute] Admin (${adminEmail}) failed to retrieve user with ID: ${userId} — ${result.error}`,
      );
    }

    responseHandler(res, result, 'GET');
  },
);

// GET: Admin fetches all users
router.get(
  '/admin/users',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const parsedLimit = parseInt(req.query.limit as string);
    const cursor = req.query.cursor as string | undefined;

    // Default limit + clamp limit
    const limit = Math.max(1, Math.min(isNaN(parsedLimit) ? 20 : parsedLimit, 100));

    const adminEmail = getUserEmailFromRequest(req);
    const result = await AdminService.getUsers(limit, cursor);

    if (result.success) {
      logger.info(
        `[AdminRoute] Admin (${adminEmail}) retrieved users with cursor ${cursor ?? 'none'} (limit: ${limit})`,
      );
    } else {
      logger.warn(`[AdminRoute] Admin (${adminEmail}) failed to retrieve users — ${result.error}`);
    }

    responseHandler(res, result, 'GET');
  },
);

// DELETE: Admin deletes a single user by ID
router.delete(
  '/admin/user/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const adminEmail = getUserEmailFromRequest(req);

    const result = await AdminService.deleteUserById(userId);

    if (result.success) {
      logger.info(`[AdminRoute] Admin (${adminEmail}) deleted user ID: ${userId}`);
    } else {
      logger.warn(
        `[AdminRoute] Admin (${adminEmail}) failed to delete user ID: ${userId} — ${result.error}`,
      );
    }

    return responseHandler(res, result, 'DELETE');
  },
);

export default router;
