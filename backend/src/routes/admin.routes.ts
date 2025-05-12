import { Request, Response, Router } from 'express';

import { authenticateToken } from '../middleware/auth';
import { authorizeRoles } from '../middleware/authorizeRoles';
import { responseHandler } from '../utils/responseHandler';
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
    responseHandler(res, result, 'POST');
  },
);

// GET: Fetch single user by ID
router.get('/admin/user/:id', authenticateToken, async (req: Request, res: Response) => {
  const userId = req.params.id;

  const result = await AdminService.getUserById(userId);
  responseHandler(res, result, 'GET');
});

// GET: Fetch all users
router.get('/admin/users', authenticateToken, async (req: Request, res: Response) => {
  const result = await AdminService.getUsers();
  responseHandler(res, result, 'GET');
});

export default router;
