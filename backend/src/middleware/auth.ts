import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';

import { logger } from '../utils/logger.js';

import type { AuthenticatedUser } from '../types/types.js';

const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET as string;

if (!supabaseJwtSecret) throw new Error('SUPABASE_JWT_SECRET is not set. Check your .env file.');

const verifyJwt = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
};

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Access denied: no token provided' });
    return;
  }

  try {
    const decoded = (await verifyJwt(token, supabaseJwtSecret)) as AuthenticatedUser;
    req.user = decoded;
    logger.info('User authenticated');
    next();
  } catch (err) {
    logger.error('Token verification failed:', err);
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
}
