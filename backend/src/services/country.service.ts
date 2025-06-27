import { Request, Response } from 'express';
import { serverError, success } from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';

export const CountryService = {
  async getAllCountries(req: Request, res: Response): Promise<Response> {
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

      const countriesWithType = countries.map((country) => ({
        ...country,
        type: 'country',
      }));

      return success(res, 'Countries fetched successfully', countriesWithType);
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch countries',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  },
};
