import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, validateId } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { User } from '@prisma/client';
import { PublicUser, ServiceResponse } from '../types/types';
import { SupabaseProvider } from '../providers/supabase.provider';

export const AdminService = {
  async adminCreateUser(
    name: string,
    email: string,
    role: string = 'USER',
  ): Promise<ServiceResponse<User>> {
    const validationResult = validateUserInput(name, email);

    if (!validationResult.success) {
      logger.error('[AdminService] Validation failed during user creation.');
      return {
        success: false,
        error: validationResult.error ?? '',
      };
    }

    try {
      const user = await prisma.user.create({
        data: { name, email, role },
      });

      logger.success(`[AdminService] User created successfully:`, user.email);
      return { success: true, data: user as User };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'AdminService');
    }
  },

  async getUsers(
    cursor?: string,
    limit = 20,
  ): Promise<
    ServiceResponse<{
      users: PublicUser[];
      nextCursor: string | null;
    }>
  > {
    try {
      const safeLimit = Math.min(limit, 100);

      const users = await prisma.user.findMany({
        take: safeLimit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      const nextCursor = users.length === safeLimit ? users[users.length - 1].id : null;

      logger.success(
        `[AdminService] Retrieved ${users.length} users | Cursor: ${cursor ?? 'none'} | NextCursor: ${nextCursor ?? 'null'}`,
      );
      return { success: true, data: { users, nextCursor } };
    } catch (error) {
      return handlePrismaRequestError(error, 'fetching users', 'AdminService');
    }
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
