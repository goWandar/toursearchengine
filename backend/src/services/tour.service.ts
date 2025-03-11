import { prisma } from "../db/prisma";
import { ServiceResponse } from "../types/types";
import { Tour } from "../types/types";
import { handlePrismaRequestError } from "../utils/errorHandler";

export const TourService = {
  async getAllTours(): Promise<ServiceResponse<Tour[]>> {
    try {
      const tours = await prisma.tour.findMany({
        include: {
          images: true,
          prices: true,
        },
      });

      return { success: true, data: tours };
    } catch (error) {
      return handlePrismaRequestError(error, "getting tours");
    }
  },
};
