import { Request, Response, Router } from 'express';

import { authenticateToken } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { responseHandler } from '../utils/responseHandler';
import { getUserEmailFromRequest } from '../utils/authHelpers';
import { logger } from '../utils/logger';
import { AdminService } from '../services/admin.service';

const router = Router();

//TODO:

// DELETE /admin/user/:id – delete a user
// PUT /admin/user/:id/role – promote or demote
// PATCH /admin/user/:id/suspend – temporarily disable access
// PUT /admin/user/:id/role – promote/demote user (e.g. to ADMIN)

//  TBD App Configuration / Settings
// GET /admin/config – fetch app/system config
// PUT /admin/config – update config (feature flags, maintenance mode)

// TBD Content Moderation (if applicable)
// GET /admin/reports – view flagged content/reports
// DELETE /admin/content/:id – remove user-generated content
// PATCH /admin/content/:id/status – update moderation status

//  6. Analytics / Dashboard
// GET /admin/stats – general KPIs (user signups, active users, etc.)
// GET /admin/stats/usage – API or feature usage metrics

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

    if (!userId) {
      responseHandler(
        res,
        {
          success: false,
          error: 'UserId missing, unable to process.',
        },
        'GET',
      );
      return;
    }

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
    const result = await AdminService.getUsers();
    const adminEmail = getUserEmailFromRequest(req);

    //TODO: add pagination !!!
    if (!result.success) {
      logger.info(`[AdminRoute] Admin (${adminEmail}) retrieved all users`);
    }

    responseHandler(res, result, 'GET');
  },
);

export default router;
