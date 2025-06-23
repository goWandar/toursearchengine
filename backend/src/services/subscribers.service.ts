import { prisma } from '../db/prisma.js';

import { handlePrismaRequestError } from '../utils/errorHandler.js';
import { checkRequiredFields, emailFormattingCheck } from '../utils/inputValidation.js';
import { logger } from '../utils/logger.js';

import { ServiceResponse } from '../types/types.js';

export const SubscribersService = {
  async registerEmailForBeta(
    email: string,
  ): Promise<ServiceResponse<{ id: string; email: string }>> {
    const requiredCheck = checkRequiredFields({
      key: 'email',
      value: email,
    });
    if (!requiredCheck.success)
      return {
        success: false,
        error: requiredCheck.error || 'Missing required fields',
      };

    const emailCheck = emailFormattingCheck(email);
    if (!emailCheck.success) {
      return {
        success: false,
        error: emailCheck.error || 'Invalid email format.',
      };
    }

    try {
      const newEmail = await prisma.betaSubscribers.create({
        data: { email },
      });

      logger.success(`[Subscribers Service] Email registered successfully:`, email);
      return { success: true, data: newEmail };
    } catch (error) {
      return handlePrismaRequestError(error, 'registering email', 'SubscribersService');
    }
  },
};
