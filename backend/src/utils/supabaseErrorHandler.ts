import { logger } from './logger';

export function formatSupabaseError(
  operation: string,
  error: { code?: string; message: string },
): { success: false; error: string } {
  const message = `[Supabase] ${operation} failed: ${error.message}`;
  logger.error(message, { code: error.code });
  return {
    success: false,
    error: message,
  };
}
