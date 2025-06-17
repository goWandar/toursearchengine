// utils/genericResponseHandler.ts
import type { Response } from 'express';

export const success = (
  res: Response,
  message: string = 'Success',
  data: any = null
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const created = (
  res: Response,
  message: string = 'Resource created',
  data: any = null
) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const badRequest = (
  res: Response,
  message: string = 'Bad request'
) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

export const unauthorized = (
  res: Response,
  message: string = 'Unauthorized'
) => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const notFound = (
  res: Response,
  message: string = 'Not found'
) => {
  return res.status(404).json({
    success: false,
    message,
  });
};

export const serverError = (
  res: Response,
  message: string = 'Internal server error',
  error: Error | string = 'An unexpected error occurred'
) => {
    console.error('[SERVER ERROR]', error);
  return res.status(500).json({
    success: false,
    message,
  });
};
