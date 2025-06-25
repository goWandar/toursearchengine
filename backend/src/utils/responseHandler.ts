import { Response } from 'express';
import { logger } from './logger.js';

const ERROR_STATUS_MAP: Record<string, number> = {
  'User not found.': 404,
  'Email already exists.': 409,
  'Error fetching users.': 500,
  'Unauthorized access.': 401,
  'Invalid credentials.': 401,
  'Access forbidden.': 403,
  'Validation failed.': 422,
  'Invalid input.': 422,
  'Resource not found.': 404,
  'Duplicate entry.': 409,
  'Server error.': 500,
  'Database error.': 500,
  'Network error.': 503,
  'Service unavailable.': 503,
};

export const responseHandler = (
  res: Response,
  result: { success: boolean; error?: string; data?: any },
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'GET', // Default to GET
) => {
  let statusCode: number;

  if (result.success) {
    statusCode = method === 'POST' ? 201 : 200;
  } else {
    statusCode = ERROR_STATUS_MAP[result.error || ''] || 400;
  }

  // Log the response
  if (result.success) {
    logger.success(`[${method}] ${statusCode} - Success`, result.data);
  } else {
    logger.error(`[${method}] ${statusCode} - Error: ${result.error}`);
  }

  res.status(statusCode).json({
    success: result.success,
    statusCode,
    message: result.success ? 'Operation successful' : result.error || 'An error occurred',
    ...(result.success && result.data !== undefined && { data: result.data }),
  });
};
