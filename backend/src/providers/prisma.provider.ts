import { prisma } from '../db/prisma';

import type { User } from '@prisma/client';
import { ServiceResponse, PublicUser } from '../types/types';

import { handlePrismaRequestError } from '../utils/errorHandler';

export const PrismaProvider = {
  client: prisma,

  async createUser(userData: {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
  }): Promise<ServiceResponse<User>> {
    try {
      const user = await prisma.user.create({
        data: userData,
      });

      return { success: true, data: user as User };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'PrismaProvider');
    }
  },

  async getUsers(
    limit: number = 20,
    cursor?: string,
  ): Promise<
    ServiceResponse<{
      users: PublicUser[];
      nextCursor: string | null;
    }>
  > {
    try {
      const safeLimit = Math.max(1, Math.min(limit, 100));

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

      return { success: true, data: { users, nextCursor } };
    } catch (error) {
      return handlePrismaRequestError(error, 'fetching users', 'AdminService');
    }
  },
};
