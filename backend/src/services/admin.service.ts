import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { User, ServiceResponse } from '../types/types';
import { SupabaseProvider } from '../providers/supabase.provider';

export const AdminService = {
  async adminCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
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
        data: { id, name, email, role: 'ADMIN' },
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
      users: { id: string; name: string; email: string }[];
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

  async getUserById(
    userId: string,
  ): Promise<ServiceResponse<{ id: string; name: string; email: string }>> {
    if (!userId) {
      logger.error('[AdminService] Validation failed: Missing user ID.');
      return { success: false, error: 'User ID is required.' };
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
    try {
      // 1. Delete Supabase Auth user:
      const { error: authError } = await SupabaseProvider.deleteUserProfile(userId);

      if (authError) {
        logger.error(
          `[AdminService] Failed to delete Supabase user | ID: ${userId} | Error: ${authError.message}`,
        );
        return { success: false, error: `Failed to delete auth user: ${authError.message}` };
      }

      // 2. delete from db
      await prisma.user.delete({ where: { id: userId } });

      logger.success(`[AdminService] Successfully deleted user ${userId}`);
      return { success: true, data: null };
    } catch (error) {
      return handlePrismaRequestError(error, 'deleting user', 'AdminService');
    }
  },
};
