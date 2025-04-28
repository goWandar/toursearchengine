import { prisma } from "../db/prisma";

import { handlePrismaRequestError } from "../utils/errorHandler";
import { ServiceResponse } from "../types/types";

import { Tour } from "../types/types";

export const TourService = {
    async getAllTours(): Promise<ServiceResponse<Tour[]>> {
        try {
            const rawTours = await prisma.tour.findMany({
                include: {
                    images: true,
                    prices: true,
                },
            });

            const tours: Tour[] = rawTours.map((tour) => ({
                ...tour,
                accommodationType: tour.accommodationType || null,
            }));

            return { success: true, data: tours };
        } catch (error) {
            return handlePrismaRequestError(
                error,
                "getting tours",
                "TourService"
            );
        }
    },
};
