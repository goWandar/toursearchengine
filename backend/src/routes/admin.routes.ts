import { Request, Response, Router } from 'express';

import { authenticateToken } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { responseHandler } from '../utils/responseHandler';
import { getUserEmailFromRequest } from '../utils/authHelpers';
import { logger } from '../utils/logger';
import { AdminService } from '../services/admin.service';

const router = Router();

// POST: Admin creates a user
router.post(
  '/admin/user',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const { id, name, email } = req.body;
    const adminEmail = getUserEmailFromRequest(req);

    if (!id || !name || !email) {
      responseHandler(
        res,
        {
          success: false,
          error: 'ID, name and email are required.',
        },
        'POST',
      );
      return;
    }

    const result = await AdminService.adminCreateUser(id, name, email);

    if (result.success) {
      logger.info(`[AdminRoute] Admin (${adminEmail}) created user: ${email} (id: ${id})`);
    }

    responseHandler(res, result, 'POST');
  },
);

// GET: Fetch single user by ID
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
    }

    responseHandler(res, result, 'GET');
  },
);

// GET: Fetch all users
router.get(
  '/admin/users',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const cursor = req.query.cursor as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await AdminService.getUsers(cursor, limit);
    const adminEmail = getUserEmailFromRequest(req);

    if (!result.success) {
      logger.error(`[AdminRoute] Admin (${adminEmail}) failed to retrieve users`);
    } else {
      logger.info(
        `[AdminRoute] Admin (${adminEmail}) retrieved users with cursor ${cursor ?? 'none'} (limit: ${limit})`,
      );
    }

    responseHandler(res, result, 'GET');
  },
);

// DELETE: delete single user by ID
router.delete(
  '/admin/user/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  async (req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
      return responseHandler(res, { success: false, error: 'User ID is required' }, 'DELETE');
    }

    const result = await AdminService.deleteUserById(userId);

    return responseHandler(res, result, 'DELETE');
  },
);

export default router;
