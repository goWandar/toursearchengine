import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, validateId } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { User, ServiceResponse } from '../types/types';
import { SupabaseProvider } from '../providers/supabase.provider';

export const UserService = {
  async userCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
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

      logger.success(`[UserService] User created successfully:`, user.email);
      return { success: true, data: user as User };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'UserService');
    }
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
