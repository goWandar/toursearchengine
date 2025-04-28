import { Request, Response, Router } from 'express';

import { SupabaseProvider } from '../providers/supabase.provider';

import { responseHandler } from '../utils/responseHandler';
import { UserService } from '../services/user.service';

import { AuthUser } from '../types/types';

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
      { success: false, error: 'Name, email, and password are required' },
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

export default router;
