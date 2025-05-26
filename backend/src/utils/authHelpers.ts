import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const getUserEmailFromRequest = (req: Request): string => {
  return (req.user as JwtPayload)?.email || 'unknown-admin';
};
