// Parse free text search query parameters for tours
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
    const duration: [number, number] = durationRaw.map(Number) as [number, number];

    // Budget range
    const budgetRaw = query.budget as string[];
    const budget: [number, number] = budgetRaw.map(Number) as [number, number];

    // Sorting
    const sortBy = (query.sortBy as string) || 'relevance';

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