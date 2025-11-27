import { Request, Response } from 'express';
import { setResponse } from '../utils/genericResponseHandler.js';
import { prisma } from '../db/prisma.js';

export const CountryService = {
  async getAllCountries(req: Request, res: Response) {
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

      return setResponse.success({
        res,
        message: 'Countries fetched successfully',
        data: countriesWithType,
      });
    } catch (error) {
      return setResponse.serverError({
        res,
        message: 'Failed to fetch countries',
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },
};
