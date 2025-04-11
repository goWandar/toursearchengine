import { prisma } from "../db/prisma";
import { ServiceResponse } from "../types/types";
import { Tour } from "../types/types";
import { handlePrismaRequestError } from "../utils/errorHandler";
import { Request, Response } from "express";

type GetAllToursResponse = {
  tours: Tour[];
  cursor: number | null;
};

export const TourService = {
  async getAllTours(
    req: Request,
    res: Response
  ): Promise<ServiceResponse<GetAllToursResponse>> {
    const { location, daysMin, daysMax, cursor = 0, limit } = req.query;

    try {
      const tours = await prisma.tour.findMany({
        take: Number(limit) || 10,
        cursor: cursor ? { id: Number(cursor) } : undefined,
        where: {
          location: location
            ? {
                contains: String(location),
                mode: "insensitive",
              }
            : undefined,
          durationInDays: {
            gte: daysMin ? Number(daysMin) : undefined,
            lte: daysMax ? Number(daysMax) : undefined,
          },
        },
        include: {
          images: true,
          prices: true,
        },
        orderBy: {
          id: "asc",
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
      return handlePrismaRequestError(error, "getting tours");
    }
  },
};
