import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, validateId } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { ServiceResponse } from '../types/types';
import type { User } from '@prisma/client';
import { SupabaseProvider } from '../providers/supabase.provider';

export const UserService = {
  async _userCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
    try {
      const user = await prisma.user.create({
        data: { id, name, email, role: 'USER' },
      });

      logger.success(`[UserService] User created successfully: ${user.email}`);
      return { success: true, data: user };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'UserService');
    }
  },

  async userSignUp(name: string, email: string, password: string): Promise<ServiceResponse<User>> {
    if (!name || !email || !password) {
      logger.warn('[UserService] userSignUp: Missing required fields (name, email, or password).');
      return { success: false, error: 'Name, email, and password are required' };
    }

    if (password.length < 8) {
      logger.warn('[UserService] userSignUp: Password too short.');
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const inputValidation = validateUserInput(name, email);
    if (!inputValidation.success) {
      logger.error('[UserService] Input validation failed during sign-up.');
      return { success: false, error: inputValidation.error ?? 'Invalid input' };
    }

    const signUpResult = await SupabaseProvider.signUp(email, password);

    if (!signUpResult.success) {
      logger.error(`[UserService] Supabase sign-up failed: ${signUpResult.error}`);
      return {
        success: false,
        error: signUpResult.error,
      };
    }

    const supabaseUserId = signUpResult.data.user?.id;

    if (!supabaseUserId) {
      logger.error(`[UserService] Supabase sign-up succeeded but missing user ID for ${email}.`);
      return { success: false, error: 'Signup failed: Missing user ID' };
    }

    // store userdata in db
    return this._userCreateUser(supabaseUserId, name, email);
  },

  async userSingIn(
    email: string,
    password: string,
  ): Promise<ServiceResponse<{ email: string; accessToken: string }>> {
    if (!email || !password) {
      logger.warn('[UserService] userSignIn: Missing email or password.');
      return { success: false, error: 'Email and password are required' };
    }

    if (password.length < 8) {
      logger.warn('[UserService] userSignIn: Password too short.');
      return { success: false, error: 'Password must be at least 8 characters long.' };
    }

    const signInResult = await SupabaseProvider.signIn(email, password);

    if (!signInResult.success) {
      logger.error(`[UserService] Supabase sign-in failed: ${signInResult.error}`);
      return { success: false, error: signInResult.error };
    }

    const { user, session } = signInResult.data;
    const accessToken = session?.access_token;

    if (!accessToken) {
      logger.error('[UserService] Supabase session token missing after sign-in');
      return { success: false, error: 'Session token missing' };
    }

    if (!user.email) {
      logger.error(`[UserService] Supabase returned no email for user ${email}.`);
      return { success: false, error: 'Email not returned from Supabase' };
    }

    logger.success(`[UserService] User signed in: ${user.email}`);
    return {
      success: true,
      data: {
        email: user.email,
        accessToken,
      },
    };
  },

  async userSignOut(): Promise<ServiceResponse<null>> {
    const signOutResult = await SupabaseProvider.signOut();

    if (!signOutResult.success) {
      logger.error(`[UserService] Supabase sign-out failed: ${signOutResult.error}`);
      return { success: false, error: signOutResult.error };
    }

    logger.success('[UserService] User signed out successfully.');
    return {
      success: true,
      data: null,
    };
  },

  async userChangePassword(
    userId: string | undefined,
    newPassword: string,
    token: string | undefined,
  ): Promise<ServiceResponse<null>> {
    if (!userId) {
      logger.warn('[UserService] userChangePassword: Missing userId — user not authenticated.');
      return { success: false, error: 'User not authenticated.' };
    }

    if (!newPassword || newPassword.length < 8) {
      logger.warn(
        `[UserService] userChangePassword: Invalid newPassword provided by user ${userId}.`,
      );
      return { success: false, error: 'New password must be at least 8 characters long.' };
    }

    if (!token) {
      logger.warn(`[UserService] userChangePassword: Missing or invalid token for user ${userId}.`);
      return { success: false, error: 'Missing or invalid token.' };
    }

    const changePasswordResult = await SupabaseProvider.userChangePassword(token, newPassword);

    if (!changePasswordResult.success) {
      logger.error(
        `[UserService] Failed to change password for user ${userId}: ${changePasswordResult.error}`,
      );
      return { success: false, error: changePasswordResult.error };
    }

    logger.success(`[UserService] Password changed successfully for user ${userId}.`);
    return {
      success: true,
      data: null,
    };
  },

  async userRequestMagicLink(email: string): Promise<ServiceResponse<{ email: string }>> {
    if (!email) {
      logger.warn('[UserService] userRequestMagicLink: Missing email in request.');
      return { success: false, error: 'Email is required' };
    }

    const sendMagicLinkResult = await SupabaseProvider.sendMagicLink(email);

    if (!sendMagicLinkResult.success) {
      logger.error(
        `[UserService] Failed to send password magic link for  user ${email}: ${sendMagicLinkResult.error}`,
      );
      return { success: false, error: sendMagicLinkResult.error };
    }

    logger.success(`[UserService] Magic link successfully sent to ${email}.`);
    return {
      success: true,
      data: {
        email,
      },
    };
  },

  async userDeleteAccount(userId: string): Promise<ServiceResponse<null>> {
    const idValidation = validateId(userId);

    if (!idValidation.success) {
      logger.warn(
        `[UserService] Failed to delete account - ID validation error:: ${idValidation.error}`,
      );
      return { success: false, error: idValidation.error ?? '' };
    }

    try {
      // 1. Delete Supabase Auth user:
      const result = await SupabaseProvider.deleteUserProfile(userId);

      if (!result.success) {
        logger.error(
          `[UserService] Failed to delete Supabase user | ID: ${userId} | Error: ${result.error}`,
        );
        return { success: false, error: `Failed to delete auth user: ${result.error}` };
      }

      // 2. delete from db
      await prisma.user.delete({ where: { id: userId } });

      logger.success(`[UserService] Account deleted successfully ${userId}`);
      return { success: true, data: null };
    } catch (error) {
      logger.error(`[UserService] Unexpected error while deleting account ${userId}`, error);
      return handlePrismaRequestError(error, 'deleting user', 'UserService');
    }
  },
};
