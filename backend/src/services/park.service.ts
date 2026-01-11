import { Request, Response } from 'express';
import { setResponse } from '../utils/genericResponseHandler.js';
import { prisma } from '../db/prisma.js';

export const ParkService = {
  async getAllParks(req: Request, res: Response) {
    try {
      const parks = await prisma.park.findMany({
        select: {
          id: true,
          name: true,
          keyword: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const parksWithType = parks.map((park) => ({
        ...park,
        type: 'park',
      }));

      return setResponse.success({
        res,
        message: 'Parks fetched successfully',
        data: parksWithType,
      });
    } catch (error) {
      return setResponse.serverError({
        res,
        message: 'Failed to fetch parks',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },
};
