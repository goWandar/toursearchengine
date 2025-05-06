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

  // Create user via Supabase Auth
  const { data, error } = await SupabaseProvider.signUp(email, password);

  if (!name || !email || !password) {
    return responseHandler(
      res,
      { success: false, error: error?.message || 'Name, email, and password are required' },
      'POST',
    );
  }

  const supabaseUserId = data.user?.id;

  if (!supabaseUserId) {
    return responseHandler(
      res,
      { success: false, error: 'Signup failed: User ID is null' },
      'POST',
    );
  }

  // Store userdata
  const result = await UserService.userCreateUser(supabaseUserId, name, email);

  responseHandler(res, result, 'POST');
});

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
  const { data, error } = await SupabaseProvider.signIn(email, password);

  if (error || !data?.session?.access_token) {
    return responseHandler(
      res,
      { success: false, error: error?.message || 'Signin failed' },
      'POST',
    );
  }

  const user = data.user as AuthUser;

  const result = {
    success: true,
    data: {
      loggedInUser: user.email,
    },
  };

  responseHandler(res, result, 'POST');
});

// POST user sign out
router.post('/user/signout', async (_req: Request, res: Response) => {
  const { error } = await SupabaseProvider.signOut();

  if (error) {
    return responseHandler(res, { success: false, error: error.message }, 'POST');
  }

  const result = {
    success: true,
    data: {
      message: 'User signed out successfully',
    },
  };

  responseHandler(res, result, 'POST');
});

// POST user change password
router.post('/user/change-password', authenticateToken, async (req: Request, res: Response) => {
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return responseHandler(
      res,
      { success: false, error: 'New must be at least 8 characters long.' },
      'POST',
    );
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

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

  responseHandler(res, result, 'POST');
});

// POST user forgot password
router.post('/user/forgot-password', async (req: Request, res: Response) => {
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
      message: 'Magic Link sent to email.',
      email,
    },
  };

  responseHandler(res, result, 'POST');
});

// POST refresh session token
router.post('/user/refresh-token', async (req: Request, res: Response) => {
  const refreshToken = req.headers.authorization?.split(' ')[1]; // Bearer <refresh_token>

  if (!refreshToken) {
    return responseHandler(res, { success: false, error: 'Missing refresh token' });
  }

  const { data, error } = await SupabaseProvider.refreshToken(refreshToken);

  if (error || !data.session?.access_token) {
    return responseHandler(res, { success: false, error: 'Missing refresh token' });
  }

  const result = {
    success: true,
    data: {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
    },
  };

  responseHandler(res, result, 'POST');
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

  if (!userId) {
    return responseHandler(
      res,
      { success: false, error: 'Unauthorized: Invalid User ID.' },
      'DELETE',
    );
  }

  const { error } = await SupabaseProvider.userDeleteOwnProfile(userId);

  if (error) {
    responseHandler(res, { success: false, error: error.message }, 'DELETE');
  }

  const result = {
    success: true,
    data: {
      message: 'User profile deleted successfully.',
    },
  };

  responseHandler(res, result, 'DELETE');
});

export default router;
