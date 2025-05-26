import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput } from '../utils/inputValidation';
import { logger } from '../utils/logger';

import { User, ServiceResponse } from '../types/types';

export const UserService = {
  async userCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
    const validationResult = validateUserInput(name, email);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error ?? '',
      };
    }

    try {
      const user = await prisma.user.create({
        data: { id, name, email, role: 'USER' },
      });

      await logger.success(`[UserService] User created successfully:`, user.email);

      return { success: true, data: user as User };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'UserService');
    }
  },

  //TODO:
  // await prisma.user.delete({ where: { id: userId } });
};
