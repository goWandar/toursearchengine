import { Prisma } from "@prisma/client";
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
    const {
      location,
      daysMin,
      daysMax,
      cursor = 0,
      limit = 10,
      priceMin,
      priceMax,
      safariType,
      accomodationType,
    } = req.query;

    //generation filters
    const filters: Prisma.TourWhereInput = {
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
      prices: {
        some: {
          pricePerPerson: {
            gte: priceMin ? Number(priceMin) : undefined,
            lte: priceMax ? Number(priceMax) : undefined,
          },
        },
      },
      safariType: safariType
        ? { contains: String(safariType), mode: "insensitive" }
        : undefined,
      accomodationType: accomodationType
        ? { contains: String(accomodationType), mode: "insensitive" }
        : undefined,
    };

    try {
      const tours: Tour[] = await prisma.tour.findMany({
        take: Number(limit),
        cursor: cursor ? { id: Number(cursor) } : undefined,
        where: filters,
        include: {
          prices: true,
          images: true,
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
