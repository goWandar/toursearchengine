import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, validateId } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { PublicUser, ServiceResponse } from '../types/types';
import type { User } from '@prisma/client';

import { SupabaseProvider } from '../providers/supabase.provider';
import { PrismaProvider } from '../providers/prisma.provider';

export const AdminService = {
  async adminCreateUser(
    name: string,
    email: string,
    password: string,
    role: 'USER' | 'ADMIN' = 'USER',
  ): Promise<ServiceResponse<User>> {
    const validationResult = validateUserInput(name, email);

    if (!validationResult.success) {
      logger.error('[AdminService] Validation failed during user creation.');
      return {
        success: false,
        error: validationResult.error ?? '',
      };
    }

    const supabaseCreateResult = await SupabaseProvider.createUser(email, password);

    if (!supabaseCreateResult.success) {
      logger.error(
        `[AdminService] Failed to create Supabase user | email: ${email}} | Error: ${supabaseCreateResult.error}`,
      );
      return { success: false, error: supabaseCreateResult.error };
    }

    const prismaCreateResult = await PrismaProvider.createUser({
      id: supabaseCreateResult.data.id,
      name,
      email,
      role,
    });

    if (!prismaCreateResult.success) return prismaCreateResult;

    logger.success(`[AdminService] User created successfully:`, prismaCreateResult.data.email);
    return { success: true, data: prismaCreateResult.data as User };
  },

  async getUsers(
    limit = 20,
    cursor?: string,
  ): Promise<
    ServiceResponse<{
      users: PublicUser[];
      nextCursor: string | null;
    }>
  > {
    const result = await PrismaProvider.getUsers(limit, cursor);

    if (!result.success) {
      logger.error(`[AdminService] Failed to fetch users | Error: ${result.error}`);
      return result;
    }

    const { users, nextCursor } = result.data;

    logger.success(
      `[AdminService] Retrieved ${users.length} users | Cursor: ${cursor ?? 'none'} | NextCursor: ${nextCursor ?? 'null'}`,
    );
    return { success: true, data: { users, nextCursor } };
  },

  async getUserById(userId: string): Promise<ServiceResponse<PublicUser>> {
    const idValidation = validateId(userId);

    if (!idValidation.success) {
      logger.error(`[AdminService] Validation failed: ${idValidation.error}`);
      return { success: false, error: idValidation.error ?? '' };
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        logger.error(`[AdminService] User not found with ID: ${userId}`);
        return { success: false, error: 'User not found.' };
      }

      logger.success(`[AdminService] User retrieved | ID: ${user.id} | Email: ${user.email}`);

      return { success: true, data: user };
    } catch (error) {
      return handlePrismaRequestError(error, 'fetching user by ID', 'AdminService');
    }
  },

  async deleteUserById(userId: string): Promise<ServiceResponse<null>> {
    const idValidation = validateId(userId);

    if (!idValidation.success) {
      logger.error(`[AdminService] Validation failed: ${idValidation.error}`);
      console.log('[DEBUG] userId that failed validation:', userId);
      return { success: false, error: idValidation.error ?? '' };
    }

    // 1. Delete Supabase Auth user:
    const supabaseDeleteResult = await SupabaseProvider.deleteUserProfile(userId);

    if (!supabaseDeleteResult.success) {
      logger.error(
        `[AdminService] Failed to delete Supabase user | ID: ${userId} | Error: ${supabaseDeleteResult.error}`,
      );
      return { success: false, error: `Failed to delete auth user: ${supabaseDeleteResult.error}` };
    }

    try {
      // 2. delete from db
      await prisma.user.delete({ where: { id: userId } });

      logger.success(`[AdminService] Successfully deleted user ${userId}`);
      return { success: true, data: null };
    } catch (error) {
      return handlePrismaRequestError(error, 'deleting user', 'AdminService');
    }
  },
};
