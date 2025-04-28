// admin.routes: This could include GET a Single User by ID, GET All Users, etc.

import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { validateUserInput, checkIfValidUUID } from '../utils/inputValidation';
import logger from '../utils/logger';

import { User, ServiceResponse } from '../types/types';

export const AdminService = {
  async adminCreateUser(id: string, name: string, email: string): Promise<ServiceResponse<User>> {
    const validationResult = validateUserInput(name, email);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error ?? '',
      };
    }

    try {
      const user = await prisma.user.create({
        data: { id, name, email, role: 'ADMIN' },
      });

      await logger.success(`[AdminService] User created successfully:`, user.email);
      return { success: true, data: user as User };
    } catch (error) {
      return handlePrismaRequestError(error, 'creating user', 'AdminService');
    }
  },

  async getUsers(): Promise<ServiceResponse<{ id: string; name: string; email: string }[]>> {
    try {
      const users = await prisma.user.findMany();
      logger.success('[AdminService] Fetched all users.');
      return { success: true, data: users };
    } catch (error) {
      return handlePrismaRequestError(error, 'fetching users', 'AdminService');
    }
  },

  async getUserById(
    userId: string,
  ): Promise<ServiceResponse<{ id: string; name: string; email: string }>> {
    if (!userId) {
      logger.error('[AdminService] Validation failed: User ID is required.');
      return { success: false, error: 'User ID is required.' };
    }

    if (!checkIfValidUUID(userId)) {
      logger.error(`[AdminService] Validation failed: Invalid user ID format (${userId})`);
      return { success: false, error: 'Invalid user ID format.' };
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        logger.error(`[AdminService] User not found with ID: ${userId}`);
        return { success: false, error: 'User not found.' };
      }

      logger.success(`[AdminService] Retrieved user: ${user.name}, email: ${user.email}`);

      return { success: true, data: user };
    } catch (error) {
      return handlePrismaRequestError(error, 'fetching user by ID', 'AdminService');
    }
  },
};
