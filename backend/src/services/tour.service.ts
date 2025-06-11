import { Request, Response } from 'express';

import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

import { handlePrismaRequestError } from '../utils/errorHandler';
import { ServiceResponse, Tour } from '../types/types';

type GetAllToursResponse = {
  tours: Tour[];
  cursor: number | null;
};

export const TourService = {
  async getAllTours(
    req: Request,
    res: Response
  ): Promise<ServiceResponse<GetAllToursResponse>> {
    const {
      location,
      daysMin,
      daysMax,
      cursor = 0,
      limit = 8,
      priceMin,
      priceMax,
      safariType,
      accommodationType,
    } = req.query;

    const filters: Prisma.TourWhereInput = {
      location: location
        ? {
            contains: String(location),
            mode: 'insensitive',
          }
        : undefined,
      durationInDays: {
        gte: daysMin ? Number(daysMin) : undefined,
        lte: daysMax ? Number(daysMax) : undefined,
      },
      prices: {
        some: {
          pricePerPerson: {
            gte: priceMin ? Number(priceMin) : undefined,
            lte: priceMax ? Number(priceMax) : undefined,
          },
        },
      },
      accommodationType: accommodationType
        ? { contains: String(accommodationType), mode: 'insensitive' }
        : undefined,
    };

    try {
      const tours: Tour[] = await prisma.tour.findMany({
        skip: 1,
        take: Number(limit),
        cursor: cursor ? { id: Number(cursor) } : undefined,
        where: filters,
        include: {
          prices: true,
          images: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return {
        success: true,
        data: {
          tours,
          cursor: tours.length ? tours[tours.length - 1].id : null,
        },
      };
    } catch (error) {
      return handlePrismaRequestError(error, 'getting tours', 'TourService');
    }
  },

  async getTourByCountryId(
    req: Request,
    res: Response): Promise<ServiceResponse<Tour | null>> {
};
