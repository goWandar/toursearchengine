import { TourRaw, TourReturnType } from "../types/free-search.types.js";

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

    // Helper to parse ranges
    const parseRange = (raw: any, defaultMin: number, defaultMax: number): [number, number] => {
        if (!raw) return [defaultMin, defaultMax];

        const arr = Array.isArray(raw) ? raw : [raw];
        const nums = arr.map(Number).filter(n => !isNaN(n));

        if (nums.length === 2) return [nums[0], nums[1]];
        if (nums.length === 1) return [nums[0], defaultMax];
        return [defaultMin, defaultMax];
    };

    // Duration range with sensible default
    const duration = parseRange(query.duration, 1, 14);

    // Budget range with sensible default
    const budget = parseRange(query.budget, 1, 20000);

    // Persons (default 2)
    const personsRaw = query.persons;
    const persons = personsRaw ? Number(personsRaw) : 2;
    const validatedPersons = !isNaN(persons) && persons > 0 ? persons : 2;

    // Sorting
    const allowedSorts = [
        "default",
        "duration_short_long",
        "duration_long_short",
        "budget_low_high",
        "budget_high_low",
    ];

    const sortBy = allowedSorts.includes(query.sortBy) ? query.sortBy : "default";

    return {
        page,
        limit,
        skip,
        accommodation,
        duration,
        budget,
        persons: validatedPersons,
        sortBy,
    };
}

// Get Tours - Where Clause
export const buildWhereClause = {
    // Common filters shared by both methods
    baseFilters({
        accommodation,
        duration,
        budget,
        persons,
    }: {
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
        persons: number
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

            // Match prices for the selected number of people
            prices: {
                some: {
                    numOfPeople: persons,
                    ...(budget
                        ? {
                            pricePerPerson: {
                                gte: budget[0],
                                lte: budget[1],
                            },
                        }
                        : {}),
                },
            },
        };
    },

    // By Country ID
    byCountryId({
        countryId,
        accommodation,
        duration,
        budget,
        persons,
    }: {
        countryId: number;
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
        persons: number
    }) {
        return {
            countryId,
            ...this.baseFilters({ accommodation, duration, budget, persons }),
        };
    },

    // By Park ID
    byParkId({
        parkId,
        accommodation,
        duration,
        budget,
        persons,
    }: {
        parkId: number;
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
        persons: number
    }) {
        return {
            tourParks: { some: { parkId } },
            ...this.baseFilters({ accommodation, duration, budget, persons }),
        };
    },

    // By Experience ID
    byExperienceId({
        experienceId,
        destinationId,
        destinationType,
        accommodation,
        duration,
        budget,
        persons,
    }: {
        experienceId: number;
        destinationId: number;
        destinationType: string;
        accommodation: string[];
        duration: [number, number];
        budget?: [number, number];
        persons: number;
    }) {
        const base = this.baseFilters({ accommodation, duration, budget, persons });

        // Start with experience filter
        const where: any = {
            tourExperiences: { some: { experienceId } },
            ...base,
        };

        // Apply destination filter
        if (destinationType === "country") {
            // Country filter: tour.countryId must match
            where.countryId = destinationId;
        }

        if (destinationType === "park") {
            // Park filter: tour must have a linked TourPark with this parkId
            where.tourParks = { some: { parkId: destinationId } };
        }

        return where;
    }

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

    // Step 4: Filter prices by numOfPeople if specified in where clause
    if (where.prices?.some?.numOfPeople) {
        const targetPersons = where.prices.some.numOfPeople;

        formattedTours = formattedTours.map(tour => ({
            ...tour,
            prices: tour.prices.filter(p => p.numOfPeople === targetPersons),
        }));
    }

    // STEP 5: Apply pagination AFTER sorting (if fetched all)
    if (fetchAll) {
        formattedTours = formattedTours.slice(skip, skip + limit);
    }

    return { tours: formattedTours, total };
}
