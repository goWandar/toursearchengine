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
    const getUsersResult = await PrismaProvider.getUsers(limit, cursor);

    if (!getUsersResult.success) {
      logger.error(`[AdminService] Failed to fetch users | Error: ${getUsersResult.error}`);
      return getUsersResult;
    }

    const { users, nextCursor } = getUsersResult.data;

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

    const getUserResult = await PrismaProvider.getUserById(userId);

    if (!getUserResult.success) {
      logger.error(`[AdminService] Failed to get user ${userId}: ${getUserResult.error}`);
      return getUserResult;
    }

    const user = getUserResult.data;
    logger.success(`[AdminService] User retrieved | ID: ${user.id} | Email: ${user.email}`);

    return { success: true, data: user };
  },

  async deleteUserById(userId: string): Promise<ServiceResponse<null>> {
    const idValidation = validateId(userId);

    if (!idValidation.success) {
      logger.error(`[AdminService] Validation failed: ${idValidation.error}`);
      console.log('[DEBUG] userId that failed validation:', userId);
      return { success: false, error: idValidation.error ?? '' };
    }

    // 1. delete Supabase Auth user
    const supabaseDeleteResult = await SupabaseProvider.deleteUserProfile(userId);

    if (!supabaseDeleteResult.success) {
      logger.error(
        `[AdminService] Failed to delete Supabase user | ID: ${userId} | Error: ${supabaseDeleteResult.error}`,
      );
      return { success: false, error: `Failed to delete auth user: ${supabaseDeleteResult.error}` };
    }

    // 2. delete from db
    const prismaDeleteResult = await PrismaProvider.deleteUserById(userId);

    if (!prismaDeleteResult.success) {
      logger.error(
        `[AdminService] Failed to delete user from DB | ID: ${userId} | Error: ${prismaDeleteResult.error}`,
      );
      return prismaDeleteResult;
    }

    logger.success(`[AdminService] Successfully deleted user ${userId}`);
    return { success: true, data: null };
  },
};
