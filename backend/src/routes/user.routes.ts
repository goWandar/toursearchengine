import { Request, Response, Router } from 'express';

import { SupabaseProvider } from '../providers/supabase.provider';

import { responseHandler } from '../utils/responseHandler';
import { UserService } from '../services/user.service';

import { AuthUser } from '../types/types';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST User Sign Up
router.post('/user/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return responseHandler(
      res,
      { success: false, error: 'Name, email, and password are required' },
      'POST',
    );
  }

  if (password.length < 8) {
    return responseHandler(
      res,
      { success: false, error: 'Password must be at least 8 characters long.' },
      'POST',
    );
  }

  // Create user via Supabase Auth
  const signUpResult = await SupabaseProvider.signUp(email, password);
  if (!signUpResult.success) {
    return responseHandler(
      res,
      { success: false, error: signUpResult.error || 'Signup failed' },
      'POST',
    );
  }

  const supabaseUserId = signUpResult.data.user?.id;

  if (!supabaseUserId) {
    return responseHandler(
      res,
      { success: false, error: 'Signup failed: User ID is null' },
      'POST',
    );
  }

  // Store userdata
  const result = await UserService.userCreateUser(supabaseUserId, name, email);

  return responseHandler(res, result, 'POST');
});

// TODO: Add Rate Limiting
// POST User Sign In
router.post('/user/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return responseHandler(
      res,
      { success: false, error: 'Email and password are required' },
      'POST',
    );
  }

  if (password.length < 8) {
    return responseHandler(
      res,
      { success: false, error: 'Password must be at least 8 characters long.' },
      'POST',
    );
  }

  // Sign in via Supabase Auth
  const signInResult = await SupabaseProvider.signIn(email, password);

  if (!signInResult.success) {
    return responseHandler(res, { success: false, error: signInResult.error }, 'POST');
  }

  const { user, session } = signInResult.data;

  if (!session?.access_token) {
    return responseHandler(res, { success: false, error: 'Session token missing' }, 'POST');
  }

  const result = {
    success: true,
    data: {
      loggedInUser: user.email,
    },
  };

  return responseHandler(res, result, 'POST');
});

// POST user sign out
router.post('/user/signout', async (_req: Request, res: Response) => {
  const signOutResult = await SupabaseProvider.signOut();

  if (!signOutResult.success) {
    return responseHandler(res, { success: false, error: signOutResult.error }, 'POST');
  }

  const result = {
    success: true,
    data: {
      message: 'User signed out successfully',
    },
  };

  return responseHandler(res, result, 'POST');
});

// POST user change password
router.post('/user/change-password', authenticateToken, async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const userId = req.user?.sub;
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!newPassword || newPassword.length < 8) {
    return responseHandler(
      res,
      { success: false, error: 'New password must be at least 8 characters long.' },
      'POST',
    );
  }

  if (!userId) {
    return responseHandler(res, { success: false, error: 'User not authenticated.' }, 'POST');
  }

  if (!token) {
    return responseHandler(res, { success: false, error: 'Missing or invalid token.' }, 'POST');
  }

  const { error } = await SupabaseProvider.userChangePassword(token, newPassword);

  if (error) {
    return responseHandler(res, { success: false, error: error.message }, 'POST');
  }

  const result = {
    success: true,
    data: {
      message: 'Password changed successfully',
    },
  };

  return responseHandler(res, result, 'POST');
});

// POST user password reset
router.post('/user/send-password-reset', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return responseHandler(res, { success: false, error: 'Email is required' }, 'POST');
  }

  const { error } = await SupabaseProvider.sendMagicLink(email);

  if (error) {
    return responseHandler(res, { success: false, error: error.message }, 'POST');
  }

  const result = {
    success: true,
    data: {
      message: 'Password reset link sent to email.',
      email,
    },
  };

  return responseHandler(res, result, 'POST');
});

// POST refresh session token
router.post('/user/refresh-token', async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(' ')[1]; // Bearer <refresh_token>

  if (!refreshToken) {
    return responseHandler(res, { success: false, error: 'Missing refresh token' }, 'POST');
  }

  const { data, error } = await SupabaseProvider.refreshToken(refreshToken);

  if (error) {
    return responseHandler(
      res,
      { success: false, error: error.message || 'Invalid refresh token' },
      'POST',
    );
  }

  if (!data.session?.access_token) {
    return responseHandler(
      res,
      { success: false, error: 'Failed to generate new access token' },
      'POST',
    );
  }

  const result = {
    success: true,
    data: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
    },
  };

  return responseHandler(res, result, 'POST');
});

// DELETE user account
router.delete('/user/delete-account', authenticateToken, async (req: Request, res: Response) => {
  const userId = typeof req.user?.sub === 'string' ? req.user.sub : undefined; //`sub` is the Supabase user ID from the JWT token

  if (!userId) {
    return responseHandler(
      res,
      { success: false, error: 'Unauthorized: User ID not found.' },
      'DELETE',
    );
  }

  const deleteResult = await SupabaseProvider.deleteUserProfile(userId);

  if (!deleteResult.success) {
    return responseHandler(res, { success: false, error: deleteResult.error }, 'DELETE');
  }

  const result = {
    success: true,
    data: {
      message: 'User profile deleted successfully.',
    },
  };

  return responseHandler(res, result, 'DELETE');
});

export default router;
