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
  // async getAllTours(
  //   req: Request,
  //   res: Response
  // ): Promise<ServiceResponse<GetToursResponse>> {
  //   const {
  //     location,
  //     daysMin,
  //     daysMax,
  //     cursor = 0,
  //     limit = 8,
  //     priceMin,
  //     priceMax,
  //     safariType,
  //     accommodationType,
  //   } = req.query;

  //   const filters: Prisma.TourWhereInput = {
  //     location: location
  //       ? {
  //           contains: String(location),
  //           mode: 'insensitive',
  //         }
  //       : undefined,
  //     durationInDays: {
  //       gte: daysMin ? Number(daysMin) : undefined,
  //       lte: daysMax ? Number(daysMax) : undefined,
  //     },
  //     prices: {
  //       some: {
  //         pricePerPerson: {
  //           gte: priceMin ? Number(priceMin) : undefined,
  //           lte: priceMax ? Number(priceMax) : undefined,
  //         },
  //       },
  //     },
  //     accommodationType: accommodationType
  //       ? { contains: String(accommodationType), mode: 'insensitive' }
  //       : undefined,
  //   };

  //   try {
  //     const tours: Tour[] = await prisma.tour.findMany({
  //       skip: 1,
  //       take: Number(limit),
  //       cursor: cursor ? { id: Number(cursor) } : undefined,
  //       where: filters,
  //       include: {
  //         prices: true,
  //         images: true,
  //       },
  //       orderBy: {
  //         id: 'asc',
  //       },
  //     });

  //     return {
  //       success: true,
  //       data: {
  //         tours,
  //         cursor: tours.length ? tours[tours.length - 1].id : null,
  //       },
  //     };
  //   } catch (error) {
  //     return handlePrismaRequestError(error, 'getting tours', 'TourService');
  //   }
  // },

  async getToursByCountryId(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { countryId } = req.params;
    const { cursor, limit = 8 } = req.query;

    try {
      const parsedLimit = parseInt(limit as string, 10);
      const cursorId = cursor ? parseInt(cursor as string, 10) : undefined;

      // Get 8 tours at a time for the specified country
      const tours = await prisma.tour.findMany({
        where: { countryId: parseInt(countryId, 10) },
        take: parsedLimit,
        ...(cursorId && {
          skip: 1,
          cursor: { id: cursorId },
        }),
        orderBy: { id: 'asc' },
        include: {
          operator: {
            select: {
              id: true,
              name: true,
            },
          },
          parksId: {
            select: {
              id: true,
              name: true,
            },
          },
        }
      });

      const nextCursor = tours.length === parsedLimit ? tours[tours.length - 1].id : null;

      if (!tours.length) {
        return notFound(res, 'No tours found for this country');
      }

      return success(res, 'Tours fetched successfully', {
        tours,
        nextCursor,
        hasMore: !!nextCursor,
      });
    } catch (error) {
      return serverError(
        res,
        'Failed to fetch tours by country ID',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
};
