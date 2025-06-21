import { Request, Response } from 'express';
import {
    serverError,
    success
} from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';


export const ParkService = {

    async getAllParks(
        req: Request,
        res: Response
      ): Promise<Response> {
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

          const parksWithType = parks.map(park => ({
            ...park,
            type: 'park',
          }))
      
          return success(res, 'Parks fetched successfully', parksWithType);
        } catch (error) {
          return serverError(
            res,
            'Failed to fetch parks',
            error instanceof Error ? error : new Error(String(error))
          );
        }
      },
}