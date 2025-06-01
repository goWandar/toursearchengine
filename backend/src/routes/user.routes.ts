import { Request, Response, Router } from 'express';

import { SupabaseProvider } from '../providers/supabase.provider';

import { responseHandler } from '../utils/responseHandler';
import { UserService } from '../services/user.service';

import { authenticateToken } from '../middleware/auth';

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

  const result = await UserService.userSingIn(email, password);
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

  if (!refreshToken) {
    return responseHandler(res, { success: false, error: 'Missing refresh token' }, 'POST');
  }

  const refreshTokenResult = await SupabaseProvider.refreshToken(refreshToken);

  if (!refreshTokenResult.success) {
    return responseHandler(
      res,
      { success: false, error: refreshTokenResult.error || 'Invalid refresh token' },
      'POST',
    );
  }

  if (!refreshTokenResult.data.session?.access_token) {
    return responseHandler(
      res,
      { success: false, error: 'Failed to generate new access token' },
      'POST',
    );
  }

  const result = {
    success: true,
    data: {
      accessToken: refreshTokenResult.data.session.access_token,
      refreshToken: refreshTokenResult.data.session.refresh_token,
      expiresIn: refreshTokenResult.data.session.expires_in,
    },
  };

  return responseHandler(res, result, 'POST');
});

// DELETE User deletes account
router.delete('/user/delete-account', authenticateToken, async (req: Request, res: Response) => {
  const userId = typeof req.user?.sub === 'string' ? req.user.sub : undefined; //`sub` is the Supabase user ID from the JWT token

  if (!userId) {
    return responseHandler(
      res,
      { success: false, error: 'Unauthorized: User ID not found.' },
      'DELETE',
    );
  }

  const result = await UserService.userDeleteAccount(userId);

  if (!result.success) {
    return responseHandler(res, { success: false, error: result.error }, 'DELETE');
  }

  return responseHandler(res, result, 'DELETE');
});

export default router;
