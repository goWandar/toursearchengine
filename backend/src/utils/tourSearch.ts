import { TourFiltersType } from "../types/types.js";

// Reusable function to build Prisma where filters based on TourFiltersType
export const buildTourWhereFilters = (filters: TourFiltersType) => {
    const filter: any = {};

    console.log('Building filters with:', filters);

    // Accommodation
    if (filters.accommodation && filters.accommodation.length > 0) {
        filter.accommodationType = { in: filters.accommodation };
    }

    // Duration
    const [minDur = 1, maxDur = 14] = filters.duration || [];
    if (!(minDur === 1 && maxDur === 14)) {
        filter.durationInDays = { gte: minDur, lte: maxDur };
    }

    console.log('Constructed filter:', filter);

    return filter;
};