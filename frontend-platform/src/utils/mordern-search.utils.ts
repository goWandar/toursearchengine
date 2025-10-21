import { getParksAndCountries, getToursByCountryId, getToursByParkId } from "@/lib/api/mordern-search.api";
import { paginationType, ParkSearchType, Price, SuggestionType, Tour, TourFiltersType } from "@/types/types";
import Fuse from "fuse.js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

// GET Park's/Countries Tour Results (search-results.tsx)
export const fetchTours = async (
    id: number,
    type: string,
    paginationMeta: paginationType,
    setTourResults: React.Dispatch<React.SetStateAction<Tour[]>>,
    setPaginationMeta: React.Dispatch<React.SetStateAction<paginationType>>,
    isLoadMore: boolean = false,
    filters: TourFiltersType
) => {
    try {
        // Determine page for this fetch
        const pageToFetch = isLoadMore ? paginationMeta.page + 1 : paginationMeta.page;
        const updatedPaginationMeta = { ...paginationMeta, page: pageToFetch };

        let fetchedTours: { tours: Tour[]; pagination: paginationType };

        if (type === 'park') {
            fetchedTours = await getToursByParkId(id, updatedPaginationMeta, filters);
        } else if (type === 'country') {
            fetchedTours = await getToursByCountryId(id, updatedPaginationMeta, filters);
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

// Update URL with filters and reset pagination (results-filters.tsx)
export function applyFiltersHelper({
    filters,
    searchParams,
    router,
    setPaginationMeta,
    setTourResults,
}: {
    filters: TourFiltersType;
    searchParams: URLSearchParams;
    router: AppRouterInstance;
    setPaginationMeta: (pagination: paginationType) => void;
    setTourResults: React.Dispatch<React.SetStateAction<any[]>>;
}) {
    // Reset pagination
    const resetPagination: paginationType = {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasMore: false,
    };
    setPaginationMeta(resetPagination);

    // Reset Tour Results
    setTourResults([]);

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

    // 3. Update URL without reloading
    router.replace(`?${params.toString()}`);
}