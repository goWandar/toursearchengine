import { Request, Response } from 'express';
import {
    serverError,
    success
} from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';


export const CountryService = {

    async getAllCountries(
        req: Request,
        res: Response
      ): Promise<Response> {
        try {
          const countries = await prisma.country.findMany({
            select: {
              id: true,
              name: true,
            },
            orderBy: {
              name: 'asc',
            },
          });
      
          return success(res, 'Countries fetched successfully', countries);
        } catch (error) {
          return serverError(
            res,
            'Failed to fetch parks',
            error instanceof Error ? error : new Error(String(error))
          );
        }
      },
}