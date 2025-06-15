import { Request, Response, Router } from 'express';

import { responseHandler } from '../utils/responseHandler.js';
import { UserService } from '../services/user.service.js';

import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// POST User signs up
router.post('/user/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await UserService.userSignUp(name, email, password);
  return responseHandler(res, result, 'POST');
});

// POST User signs in
router.post('/user/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await UserService.userSignIn(email, password);
  return responseHandler(res, result, 'POST');
});

// POST User signs out
router.post('/user/signout', async (_req: Request, res: Response) => {
  const result = await UserService.userSignOut();

  return responseHandler(res, result, 'POST');
});

// POST User changes password
router.post('/user/change-password', authenticateToken, async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const userId = req.user?.sub;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  const result = await UserService.userChangePassword(userId, newPassword, token);

  return responseHandler(res, result, 'POST');
});

// POST User requests password magic link
router.post('/user/send-magic-link', async (req: Request, res: Response) => {
  const { email } = req.body;

  const result = await UserService.userRequestMagicLink(email);

  return responseHandler(res, result, 'POST');
});

// POST User refreshes session token
router.post('/user/refresh-token', async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(' ')[1]; // Bearer <refresh_token>

  const result = await UserService.userRefreshToken(refreshToken);

  return responseHandler(res, result, 'POST');
});

// DELETE User deletes account
router.delete('/user/delete-account', authenticateToken, async (req: Request, res: Response) => {
  const userId = typeof req.user?.sub === 'string' ? req.user.sub : undefined; //`sub` is the Supabase user ID from the JWT token

  const result = await UserService.userDeleteAccount(userId);

  return responseHandler(res, result, 'DELETE');
});

export default router;
