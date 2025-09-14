import { Request, Response } from 'express';
import {
  notFound,
  serverError,
  success
} from '../utils/genericResponseHandler.js';

import { prisma } from '../db/prisma.js';

import { Tour } from '../types/types.js';

type GetToursResponse = {
  tours: Tour[];
  cursor: number | null;
};

export const TourService = {

  // Get tours by country ID
  async getToursByCountryId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const countryId = parseInt(req.params.countryId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const [tours, total] = await Promise.all([
        prisma.tour.findMany({
          where: { countryId, archived: false },
          skip,
          take: limit,
          orderBy: { dateCreated: 'asc' },
          include: {
            operator: { select: { id: true, name: true } },
            images: true,
            prices: true,
            tourParks: {
              select: {
                park: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        }),
        prisma.tour.count({
          where: { countryId, archived: false },
        }),
      ]);

      if (!tours.length) {
        return notFound(res, 'No tours found for this country');
      }

      //Flatten parks array for each tour
      const formattedTours = tours.map(({ tourParks, ...rest }: { tourParks: { park: { id: number; name: string } }[];[key: string]: any }) => ({
        ...rest,
        parks: tourParks.map(tp => tp.park),
      }));

      return success(res, 'Tours fetched successfully', {
        tours: formattedTours,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      });
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch tours by country ID',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  },

  // Get tours by park ID
  async getToursByParkId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const parkId = parseInt(req.params.parkId);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;
      const skip = (page - 1) * limit;

      const [tours, total] = await Promise.all([
        prisma.tour.findMany({
          where: {
            tourParks: {
              some: { parkId },
            },
            archived: false,
          },
          skip,
          take: limit,
          orderBy: { dateCreated: 'asc' },
          include: {
            operator: { select: { id: true, name: true } },
            country: { select: { id: true, name: true } },
            tourParks: {
              include: {
                park: {
                  select: { id: true, name: true },
                },
              },
            },
          },
        }),
        prisma.tour.count({
          where: {
            tourParks: {
              some: { parkId },
            },
            archived: false,
          },
        }),
      ]);

      if (!tours.length) {
        return notFound(res, 'No tours found for this park');
      }

      // Flatten parks and remove the one used for filtering
      const formattedTours = tours.map(({ tourParks, ...rest }: { tourParks: { park: { id: number; name: string } }[];[key: string]: any }) => ({
        ...rest,
        parks: tourParks
          .filter(tp => tp.park.id !== parkId)
          .map(tp => tp.park),
      }));

      return success(res, 'Tours fetched successfully', {
        tours: formattedTours,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: page * limit < total,
        },
      });
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch tours by park ID',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  },

  // Get parks and tours suggestions
  async getAllParksAndCountries(req: Request, res: Response): Promise<Response> {
    try {
      // Fetch parks
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
      }));

      // Fetch countries
      const countries = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const countriesWithType = countries.map(country => ({
        ...country,
        type: 'country',
      }));

      // Return both in one response
      return success(res, 'Parks and countries fetched successfully', {
        parks: parksWithType,
        countries: countriesWithType,
      });
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch parks and countries',
        error instanceof Error ? error : new Error(String(error)),
      );
    }
  }
};
