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
          },
        }),
        prisma.tour.count({
          where: { countryId, archived: false },
        }),
      ]);
  
      if (!tours.length) {
        return notFound(res, 'No tours found for this country');
      }
  
      return success(res, 'Tours fetched successfully', {
        tours,
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
            parksId: { some: { id: parkId } },
            archived: false,
          },
          skip,
          take: limit,
          orderBy: { dateCreated: 'asc' },
          include: {
            operator: { select: { id: true, name: true } },
            country: { select: { id: true, name: true } },
            parksId: { select: { id: true, name: true } },
          },
        }),
        prisma.tour.count({
          where: {
            parksId: { some: { id: parkId } },
            archived: false,
          },
        }),
      ]);
  
      if (!tours.length) {
        return notFound(res, 'No tours found for this park');
      }
  
      return success(res, 'Tours fetched successfully', {
        tours,
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
  }
};
