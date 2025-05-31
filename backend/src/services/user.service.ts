import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, validateId } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { ServiceResponse } from '../types/types';
import type { User } from '@prisma/client';
import { SupabaseProvider } from '../providers/supabase.provider';

export const UserService = {
  async _userCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
    const validationResult = validateUserInput(name, email);

    if (!validationResult.success) {
      logger.error(
        '[UserService] Validation failed during user creation - check email and username.',
      );
      return {
        success: false,
        error: validationResult.error ?? '',
      };
    }

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
      return { success: false, error: 'Signup failed: Missing user ID' };
    }

    // store userdata in db
    return this._userCreateUser(supabaseUserId, name, email);
  },

  async userSingIn(
    email: string,
    password: string,
  ): Promise<ServiceResponse<{ email: string; accessToken: string }>> {
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

    return {
      success: true,
      data: null,
    };
  },

  async userDeleteAccount(userId: string): Promise<ServiceResponse<null>> {
    const idValidation = validateId(userId);

    if (!idValidation.success) {
      logger.error(
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
      return handlePrismaRequestError(error, 'deleting user', 'UserService');
    }
  },
};
