// utils/genericResponseHandler.ts

import { RequestResponseType } from "../types/types.js";

export const setResponse = {
  success: <T = any>({ res, message = 'Success', data = null, code = 'SUCCESS' }: RequestResponseType<T>) => {
    return res.status(200).json({ success: true, message, data, code });
  },

  created: <T = any>({ res, message = 'Resource created', data = null, code = 'CREATED' }: RequestResponseType<T>) => {
    return res.status(201).json({ success: true, message, data, code });
  },

  badRequest: ({ res, message = 'Bad request', code = 'BAD_REQUEST' }: RequestResponseType) => {
    return res.status(400).json({ success: false, message, code });
  },

  unauthorized: ({ res, message = 'Unauthorized', code = 'UNAUTHORIZED' }: RequestResponseType) => {
    return res.status(401).json({ success: false, message, code });
  },

  notFound: ({ res, message = 'Not found', code = 'NOT_FOUND' }: RequestResponseType) => {
    return res.status(404).json({ success: false, message, code });
  },

  serverError: ({ res, message = 'Internal server error', error = 'An unexpected error occurred', code = 'SERVER_ERROR' }: RequestResponseType) => {
    console.error('[SERVER ERROR]', error);
    return res.status(500).json({ success: false, message, code });
  },
};


