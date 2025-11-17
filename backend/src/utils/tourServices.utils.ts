import { TourRaw, TourReturnType } from "../types/free-search.types.js";
import { Image, Price, Tour } from "../types/types.js";

// Fetch Tours Params Interface
interface FetchToursParams {
    prisma: any;
    where: any;
    sortBy?: string;
    skip: number;
    limit: number;
};

// Parse and validate query parameters for tour services
export function parseTourQueryParams(query: any) {
    // Pagination
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Accommodation
    const accommodationParam = query.accommodation;
    const accommodation = Array.isArray(accommodationParam)
        ? accommodationParam.map(String)
        : accommodationParam
            ? [String(accommodationParam)]
            : [];

    // Duration range
    const durationRaw = query.duration as string[];
    const duration: [number, number] = durationRaw
        ? durationRaw.map(Number) as [number, number]
        : [0, Number.MAX_SAFE_INTEGER];

    // Budget range
    const budgetRaw = query.budget as string[];
    const budget: [number, number] = budgetRaw
        ? budgetRaw.map(Number) as [number, number]
        : [0, Number.MAX_SAFE_INTEGER];

    // Sorting
    const allowedSorts = [
        "default",
        "duration_short_long",
        "duration_long_short",
        "budget_low_high",
        "budget_high_low",
    ];
    const sortBy =
        allowedSorts.includes(query.sortBy as string) ?
            (query.sortBy as string) :
            "default";

    return {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        sortBy,
    };
}

// Get Tours by Park ID or Country ID - Where Clause
export const buildWhereClause = {
    // Common filters shared by both methods
    baseFilters({
        accommodation,
        duration,
        budget,
    }: {
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
    }) {
        return {
            archived: false,

            ...(accommodation.length
                ? { accommodationType: { in: accommodation } }
                : {}),

            durationInDays: {
                gte: duration[0],
                lte: duration[1],
            },

            ...(budget
                ? {
                    prices: {
                        some: {
                            pricePerPerson: {
                                gte: budget[0],
                                lte: budget[1],
                            },
                        },
                    },
                }
                : {}),
        };
    },

    // By Country ID
    byCountryId({
        countryId,
        accommodation,
        duration,
        budget,
    }: {
        countryId: number;
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
    }) {
        return {
            countryId,
            ...this.baseFilters({ accommodation, duration, budget }),
        };
    },

    // By Park ID
    byParkId({
        parkId,
        accommodation,
        duration,
        budget,
    }: {
        parkId: number;
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
    }) {
        return {
            tourParks: { some: { parkId } },
            ...this.baseFilters({ accommodation, duration, budget }),
        };
    },
};

// Get Tours by Park ID or Country ID - OrderBy Clause
export function getOrderByClause(sortBy?: string) {
    switch (sortBy) {
        case "duration_short_long":
            return { durationInDays: "asc" };

        case "duration_long_short":
            return { durationInDays: "desc" };

        // For budget sorts, we override with JS later
        case "budget_low_high":
        case "budget_high_low":
            return undefined;

        default:
            return { dateCreated: "asc" };
    }
}

// Fetch Tours Function
export async function fetchTours({
    prisma,
    where,
    sortBy,
    skip,
    limit,
}: FetchToursParams) {
    const orderBy = getOrderByClause(sortBy);

    // Step 1: Fetch All if sorting by budget, else apply pagination in query
    const fetchAll = sortBy === 'budget_low_high' || sortBy === 'budget_high_low';

    const [tours, total] = await Promise.all([
        prisma.tour.findMany({
            where,
            ...(fetchAll ? {} : { skip, take: limit, orderBy }),
            include: {
                operator: { select: { id: true, name: true } },
                country: { select: { id: true, name: true } },
                images: true,
                prices: true,
                tourParks: { include: { park: { select: { id: true, name: true } } } },
            },
        }),
        prisma.tour.count({ where }),
    ]);

    if (!tours.length) return { tours, total };

    // Step 2: Flatten parks to parks: {id, name}[]
    let formattedTours: TourReturnType[] = tours.map(({ tourParks, ...rest }: TourRaw) => ({
        ...rest,
        parks: tourParks.map((tp) => tp.park),
    }));

    // Step 3: Apply JS if sorting by budget
    if (sortBy === 'budget_low_high') {
        formattedTours.sort(
            (a, b) =>
                Math.min(...a.prices.map((p) => p.pricePerPerson)) -
                Math.min(...b.prices.map((p) => p.pricePerPerson))
        );
    }

    if (sortBy === 'budget_high_low') {
        formattedTours.sort(
            (a, b) =>
                Math.min(...b.prices.map((p) => p.pricePerPerson)) -
                Math.min(...a.prices.map((p) => p.pricePerPerson))
        );
    }

    // STEP 4: Apply pagination AFTER sorting (if fetched all)
    if (fetchAll) {
        formattedTours = formattedTours.slice(skip, skip + limit);
    }

    return { tours: formattedTours, total };
}
