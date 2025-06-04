import { logger } from './logger';

import { ServiceError } from '../types/types';

export function formatSupabaseError(
  operation: string,
  error: { code?: string; message: string },
): ServiceError {
  const message = `[Supabase] ${operation} failed: ${error.message}`;
  logger.error(message, { code: error.code });

  return {
    success: false,
    error: message,
  };
}
