import { getParksAndCountries, getToursByCountryId, getToursByParkId } from "@/lib/api/mordern-search.api";
import { paginationType, ParkSearchType, Price, SortToursType, SuggestionType, Tour, TourFiltersType } from "@/types/types";
import Fuse from "fuse.js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type HandlerDeps = {
    filters: TourFiltersType;
    sortBy: SortToursType;
    router: any;
    searchParams: any;
    resetPagination: () => void;
    loadTours: (filters: TourFiltersType, sortBy: SortToursType) => Promise<void>;
    setFilters?: (filters: TourFiltersType) => void;
    setSortBy?: (value: SortToursType) => void;
};

// Default filter and pagination values
export const DEFAULT_FILTERS: TourFiltersType = { accommodation: [], budget: [100, 20000], duration: [1, 14] }
export const DEFAULT_PAGINATION: paginationType = { page: 1, limit: 12, total: 0, totalPages: 0, hasMore: false }

// GET Parks and Countries Search Suggestions from DB
const fetchParksCountries = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
    setPopularParks: (parks: ParkSearchType[]) => void,
    setTrendingSearches: (searches: SuggestionType[]) => void,
) => {
    try {
        const parksCountries = await getParksAndCountries();

        const combined: SuggestionType[] = [
            ...parksCountries.parks,
            ...parksCountries.countries,
        ];

        const popularParks: ParkSearchType[] = parksCountries.popularParks ?? [];
        const trendingSearches: SuggestionType[] = parksCountries.trendingSearches ?? [];

        setPopularParks(popularParks || []);
        setTrendingSearches(trendingSearches || []);
        setSuggestionsList(combined);

        return parksCountries;

    } catch (error) {
        console.error("Failed to fetch parks or countries", error);
    }
};

// GET Parks and Countries Search Suggestions (modern-search.tsx)
export const getSearchSuggestions = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
    setPopularParks: (parks: ParkSearchType[]) => void,
    setTrendingSearches: (searches: SuggestionType[]) => void,
    setIsLoading: (isLoading: boolean) => void
) => {
    try {
        setIsLoading(true);
        const cachedSuggestions = localStorage.getItem("parksAndCountries");

        // First Check in Local Storage
        if (cachedSuggestions) {
            const parsedData = JSON.parse(cachedSuggestions);

            const combined: SuggestionType[] = [
                ...(parsedData.parks ?? []),
                ...(parsedData.countries ?? []),
            ];

            const popularParks: ParkSearchType[] = parsedData.popularParks ?? [];
            const trendingSearches: SuggestionType[] = parsedData.trendingSearches ?? [];

            setPopularParks(popularParks);
            setTrendingSearches(trendingSearches);
            setSuggestionsList(combined || []);
            return;
        }

        // Fetch from DB
        const parksCountries = await fetchParksCountries(
            setSuggestionsList,
            setPopularParks,
            setTrendingSearches
        );

        if (parksCountries) {
            localStorage.setItem("parksAndCountries", JSON.stringify(parksCountries));
        }
    } catch (error) {
        console.error("Failed to get search suggestions", error);
        setSuggestionsList([]);
    } finally {
        setIsLoading(false);
    }
};

// Handle Parks and Countries Search (modern-search.tsx)
export const handleSearch = (
    searchValue: string,
    suggestionsList: SuggestionType[],
    setFilteredSuggestions: React.Dispatch<React.SetStateAction<(SuggestionType[])>>,
) => {

    if (!searchValue.trim()) {
        setFilteredSuggestions([]);
        return;
    }

    // Fuse options
    const suggestionsOptions = {
        keys: ["name", "keyword"],
        threshold: 0.25,
    };

    const suggestionsFuse = new Fuse(suggestionsList, suggestionsOptions);

    const filteredResults = suggestionsFuse.search(searchValue).slice(0, 5).map((result) => result.item);

    // Set Filtered Suggestions
    setFilteredSuggestions(filteredResults);
}

// GET Park's/Countries Tour Results (useTours.tsx)
export const fetchTours = async (
    id: number,
    type: string,
    paginationMeta: paginationType,
    setTourResults: React.Dispatch<React.SetStateAction<Tour[]>>,
    setPaginationMeta: React.Dispatch<React.SetStateAction<paginationType>>,
    isLoadMore: boolean = false,
    filters: TourFiltersType,
    sortBy: SortToursType
) => {
    try {

        // Determine page for this fetch
        const pageToFetch = isLoadMore ? paginationMeta.page + 1 : paginationMeta.page;
        const updatedPaginationMeta = { ...paginationMeta, page: pageToFetch };

        let fetchedTours: { tours: Tour[]; pagination: paginationType };

        if (type === 'park') {
            fetchedTours = await getToursByParkId(id, updatedPaginationMeta, filters, sortBy);
        } else if (type === 'country') {
            fetchedTours = await getToursByCountryId(id, updatedPaginationMeta, filters, sortBy);
        } else {
            throw new Error(`Unknown type: ${type}`);
        }

        // Append or replace results
        setTourResults(prev =>
            isLoadMore ? [...prev, ...fetchedTours.tours] : fetchedTours.tours
        );

        // Update pagination meta
        setPaginationMeta(fetchedTours.pagination);

        return fetchedTours;
    } catch (error) {
        console.error("Failed to fetch tours", error);
    }
};


// Get price of selected group size (modern-safari-card.tsx)
export const getPriceForGroupSize = (
    prices: Price[],
    groupSize: number
): Price | undefined => {
    const sorted = [...prices].sort((a, b) => a.numOfPeople - b.numOfPeople);
    return (
        sorted.find(p => p.numOfPeople === groupSize) ??
        [...sorted].reverse().find(p => p.numOfPeople <= groupSize) ??
        sorted[0]
    );
};

// Format season period from e.g "1,2,3\n6,7,8" to "Jan–Mar & Jun–Aug" (modern-safari-card.tsx)
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatSeasonPeriod = (period: string | null): string => {
    if (!period) return "";

    // Split by \n or commas
    const groups = period.split("\n").map(g => g.split(",").map(n => parseInt(n.trim(), 10)));

    const formattedRanges = groups.map(group => {
        if (group.length === 1) return monthNames[group[0] - 1];
        const sorted = group.sort((a, b) => a - b);
        const start = monthNames[sorted[0] - 1];
        const end = monthNames[sorted[sorted.length - 1] - 1];
        return `${start}–${end}`;
    });

    return formattedRanges.join(" & ");
};

// Filter prices by selected season (modern-safari-card.tsx)
export const filterPricesBySeason = (prices: Price[], season: string | null): Price[] => {
    return season
        ? prices.filter((p) => p.seasonName === season)
        : prices;
};

//  Extracts unique season names from price data (modern-safari-card.tsx)
export const getUniqueSeasons = (prices: Price[]): string[] => {
    return Array.from(new Set(prices.map((p) => p.seasonName).filter(Boolean))) as string[];
};

// Get filters from URLSearchParams (search-results.tsx)
export function getQueriesFromSearchParams(
    searchParams: URLSearchParams
) {
    // Extract params
    const accommodationParam = searchParams.get("acc");
    const durationParam = searchParams.get("dur");
    const budgetParam = searchParams.get("bud");
    const sortParam = searchParams.get("sort");

    // Parse accommodation
    const accommodation = accommodationParam
        ? accommodationParam.split("|")
        : [];

    // Parse duration
    const duration: [number, number] = durationParam
        ? durationParam
            .split("-")
            .map(Number)
            .slice(0, 2) as [number, number]
        : [1, 14];

    // Parse budget
    const budget: [number, number] = budgetParam
        ? budgetParam
            .split("-")
            .map(Number)
            .slice(0, 2) as [number, number]
        : [100, 20000];

    // Parse sort
    const sorting: SortToursType = (sortParam as SortToursType) || "relevance";

    return {
        initialFilters: {
            accommodation,
            duration,
            budget,
        },
        initialSorting: sorting,
    };
}

// Update URL with filters query params
function applyFiltersHelper({
    filters,
    searchParams,
    router,
}: {
    filters: TourFiltersType;
    searchParams: URLSearchParams;
    router: AppRouterInstance;
}) {
    // Create a modifiable copy of the URLSearchParams
    const params = new URLSearchParams(searchParams.toString());

    // 1. Accommodation filter
    if (filters.accommodation.length > 0) {
        params.set("acc", filters.accommodation.join("|"));
    } else {
        params.delete("acc");
    }

    // 2. Duration filter
    const [minDur, maxDur] = filters.duration;
    if (!(minDur === 1 && maxDur === 14)) {
        params.set("dur", `${minDur}-${maxDur}`);
    } else {
        params.delete("dur");
    }

    // 3. Budget filter
    const [minBudget, maxBudget] = filters.budget;
    if (!(minBudget === 100 && maxBudget === 20000)) {
        params.set("bud", `${minBudget}-${maxBudget}`);
    } else {
        params.delete("bud");
    }

    // 4. Update URL without reloading
    router.replace(`?${params.toString()}`);
}

// Reset filter query params in URL
function resetFiltersHelper({
    searchParams,
    router,
}: {
    searchParams: URLSearchParams;
    router: AppRouterInstance;
}) {
    // Create a modifiable copy of the URLSearchParams
    const params = new URLSearchParams(searchParams.toString());

    // Remove specific filter params
    params.delete("acc");
    params.delete("dur");
    params.delete("bud");

    // Update the URL without reloading
    router.replace(`?${params.toString()}`);
};


// Apply filters handler (search-results.tsx)
export const applyFiltersHandler = async ({
    filters,
    sortBy,
    searchParams,
    router,
    resetPagination,
    loadTours,
}: HandlerDeps) => {

    try {
        resetPagination();
        applyFiltersHelper({ filters, searchParams, router });
        await loadTours(filters, sortBy);
    } catch (error) {
        console.error("Error applying filters:", error);
    }
};

// Reset filters handler (search-results.tsx)
export const resetFiltersHandler = async ({
    sortBy,
    searchParams,
    router,
    resetPagination,
    loadTours,
    setFilters,
}: HandlerDeps) => {
    try {
        setFilters?.(DEFAULT_FILTERS);
        resetFiltersHelper({ searchParams, router });
        resetPagination();
        await loadTours(DEFAULT_FILTERS, sortBy);
    } catch (error) {
        console.error("Error resetting filters:", error);
    }
};


// Add the tour sort type to URL)
function applySortByHelper({
    sortBy,
    searchParams,
    router,
}: {
    sortBy: SortToursType;
    searchParams: URLSearchParams;
    router: AppRouterInstance;
}) {

    const params = new URLSearchParams(searchParams.toString());

    if (sortBy !== 'relevance') {
        params.set('sort', sortBy);
    } else {
        params.delete('sort');
    }

    router.replace(`?${params.toString()}`);
}

// Sort tours handler (search-results.tsx)
export const sortToursHandler = async ({
    filters,
    sortBy,
    searchParams,
    router,
    resetPagination,
    loadTours,
    setSortBy,
}: HandlerDeps) => {
    try {
        applySortByHelper({ sortBy, searchParams, router });
        setSortBy?.(sortBy);
        resetPagination();
        await loadTours(filters, sortBy);
    } catch (error) {
        console.error("Error sorting tours:", error);
    }
};