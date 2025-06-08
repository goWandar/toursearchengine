import { prisma } from '../db/prisma';

import type { User } from '@prisma/client';
import { ServiceResponse } from '../types/types';

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
};
