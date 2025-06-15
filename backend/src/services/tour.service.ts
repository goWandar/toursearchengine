import { logger } from '../utils/logger.js';

import { Prisma } from '@prisma/client';

import { ServiceResponse, TourFilterInput } from '../types/types.js';
import { PrismaProvider } from '../providers/prisma.provider.js';

type TourWhereInput = Prisma.TourWhereInput;
type TourWithIncludes = Prisma.TourGetPayload<{
  include: {
    prices: true;
    images: true;
  };
}>;

function buildTourFilters(params: TourFilterInput): TourWhereInput {
  const { location, daysMin, daysMax, priceMin, priceMax, accommodationType } = params;

  return {
    ...(location && {
      location: {
        contains: location,
        mode: 'insensitive',
      },
    }),

    ...(accommodationType && {
      accommodationType: {
        contains: accommodationType,
        mode: 'insensitive',
      },
    }),

    ...(daysMin || daysMax
      ? {
          durationInDays: {
            ...(daysMin ? { gte: Number(daysMin) } : {}),
            ...(daysMax ? { lte: Number(daysMax) } : {}),
          },
        }
      : {}),

    ...(priceMin || priceMax
      ? {
          prices: {
            some: {
              pricePerPerson: {
                ...(priceMin ? { gte: Number(priceMin) } : {}),
                ...(priceMax ? { lte: Number(priceMax) } : {}),
              },
            },
          },
        }
      : {}),
  };
}

export const TourService = {
  async getFilteredTours(
    limit = 8,
    cursor?: string,
    filters: TourFilterInput = {},
  ): Promise<ServiceResponse<{ tours: TourWithIncludes[]; nextCursor: number | null }>> {
    const prismaFilters = buildTourFilters(filters);
    const numericCursor = cursor ? Number(cursor) : undefined;

    const filterToursResult = await PrismaProvider.getTours(limit, numericCursor, prismaFilters);

    if (!filterToursResult.success) return filterToursResult;

    const { tours, nextCursor } = filterToursResult.data;

    logger.success(`[TourService] Tours fetched successfully.`);
    return { success: true, data: { tours, nextCursor } };
  },
};
