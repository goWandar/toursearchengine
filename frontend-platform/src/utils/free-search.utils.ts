import { getSearchItems, getParksByCountryName, getExperiencesFromDB } from "@/lib/api/free-search.api";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useToastStore } from "@/stores/useToastStore";
import { useToursStore } from "@/stores/useTourStore";
import { ExperienceType, FiltersFromUrlReturnType, LoadInitialToursParams, LoadToursByExperienceParams, LoadToursByParkParams, ParkSearchType, SearchItemType, SortToursType, SuggestionType, TourFiltersType, ToursPricedByType } from "@/types/free-search.types";
import { Price } from "@/types/types";
import Fuse from "fuse.js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// GET Search Items from DB
const fetchSearchItems = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
    setPopularParks: (parks: ParkSearchType[]) => void,
    setTrendingSearches: (searches: SuggestionType[]) => void,
) => {
    try {
        const parksCountries = await getSearchItems();

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
        throw new Error("Failed to fetch parks and countries");
    }
};

// GET Search Items (Suggestions & Experiences) (modern-search.tsx)
export const getSearchSuggestions = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
    setPopularParks: (parks: ParkSearchType[]) => void,
    setTrendingSearches: (searches: SuggestionType[]) => void,
    setIsLoading: (isLoading: boolean) => void
) => {
    try {
        setIsLoading(true);
        const cachedSuggestions = localStorage.getItem("searchItems");

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
        const parksCountries = await fetchSearchItems(
            setSuggestionsList,
            setPopularParks,
            setTrendingSearches
        );

        // Set parks and countries in localStorage if just fetched from DB
        if (parksCountries) {
            localStorage.setItem("searchItems", JSON.stringify(parksCountries));
        }
    } catch (error) {
        // Send toast notification to user
        const { triggerToast } = useToastStore.getState();
        triggerToast({
            title: "Error",
            description: "Failed to load search suggestions. Please try to refresh page.",
            variant: "destructive",
        });

        setSuggestionsList([]);
        throw new Error("Failed to fetch search suggestions");
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

export const tourSearchUrlHandler = {
    // Get filters from URLSearchParams
    getFiltersFromUrl(
        searchParams: URLSearchParams,
        setAppliedFilters: (filters: TourFiltersType) => void
    ): FiltersFromUrlReturnType {
        const accommodationParam = searchParams.get("acc");
        const durationParam = searchParams.get("dur");
        const budgetParam = searchParams.get("bud");
        const sortParam = searchParams.get("sort");
        const personsParam = searchParams.get("per");

        const accommodation = accommodationParam
            ? accommodationParam.split("|")
            : [];

        const duration: [number, number] = durationParam
            ? durationParam.split("-").map(Number).slice(0, 2) as [number, number]
            : [1, 14];

        const budget: [number, number] = budgetParam
            ? budgetParam.split("-").map(Number).slice(0, 2) as [number, number]
            : [100, 20000];

        const sorting: SortToursType = (sortParam as SortToursType) || "default";

        // Persons: get from URL, convert to number, default to 2
        const persons = personsParam ? Number(personsParam) : 2;

        // Update applied filters in store
        setAppliedFilters({
            accommodation,
            duration,
            budget,
        });

        return {
            filtersFromURL: {
                accommodation,
                duration,
                budget,
            },
            sortingFromURL: sorting,
            pricedByFromURL: {
                persons,
            },
        };
    },

    // Apply filters to URL
    setFilters({
        filters,
        searchParams,
        router,
    }: {
        filters: TourFiltersType;
        searchParams: URLSearchParams;
        router: AppRouterInstance;
    }) {
        const params = new URLSearchParams(searchParams.toString());

        // Accommodation
        if (filters.accommodation.length > 0) {
            params.set("acc", filters.accommodation.join("|"));
        } else {
            params.delete("acc");
        }

        // Duration
        const [minDur, maxDur] = filters.duration;
        if (!(minDur === 1 && maxDur === 14)) {
            params.set("dur", `${minDur}-${maxDur}`);
        } else {
            params.delete("dur");
        }

        // Budget
        const [minBudget, maxBudget] = filters.budget;
        if (!(minBudget === 100 && maxBudget === 20000)) {
            params.set("bud", `${minBudget}-${maxBudget}`);
        } else {
            params.delete("bud");
        }

        router.replace(`?${params.toString()}`);
    },

    // Remove filters from URL
    resetFilters({
        searchParams,
        router,
    }: {
        searchParams: URLSearchParams;
        router: AppRouterInstance;
    }) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("acc");
        params.delete("dur");
        params.delete("bud");
        router.replace(`?${params.toString()}`);
    },

    // Apply sorting to URL
    setSortBy({
        sortBy,
        searchParams,
        router,
    }: {
        sortBy: SortToursType;
        searchParams: URLSearchParams;
        router: AppRouterInstance;
    }) {
        const params = new URLSearchParams(searchParams.toString());
        if (sortBy !== "default") {
            params.set("sort", sortBy);
        } else {
            params.delete("sort");
        }
        router.replace(`?${params.toString()}`);
    },

    // Set active tab and optionally the park/experience id in URL
    setActiveTab({
        activeTab,
        parkId,
        experienceId,
        searchParams,
        router,
    }: {
        activeTab: "all" | "parks" | "experiences";
        parkId?: number; // optional, only set when needed
        experienceId?: number; // optional, only set when needed
        searchParams: URLSearchParams;
        router: AppRouterInstance;
    }) {
        const params = new URLSearchParams(searchParams.toString());

        // Handle active tab
        if (activeTab !== "all") {
            params.set("tab", activeTab);
        } else {
            params.delete("tab");
            params.delete("park"); // also delete park when resetting tab
            params.delete("experience");
        }

        // Handle park param if provided
        if (parkId !== undefined) {
            params.set("park", String(parkId));
        }

        if (experienceId !== undefined) {
            params.set("experience", String(experienceId));
        }

        router.replace(`?${params.toString()}`);
    },

    // Apply Tours Priced By to URL
    setPricedBy({
        pricedBy,
        searchParams,
        router,
    }: {
        pricedBy: ToursPricedByType;
        searchParams: URLSearchParams;
        router: AppRouterInstance;
    }) {
        const params = new URLSearchParams(searchParams.toString());

        // Accommodation
        if (pricedBy.persons !== 2) {
            params.set("per", String(pricedBy.persons));
        } else {
            params.delete("per");
        }

        // Implement seasons soon...

        router.replace(`?${params.toString()}`);
    },

};

// Get Parks by Country Name (parks-tab-content.tsx)
export async function getParksByCountry(country: string) {
    // Retrieve data from localStorage
    const searchItems = localStorage.getItem("searchItems");

    try {
        if (!searchItems) {
            // Load parks directly from the Database if not in localStorage
            const parks = await getParksByCountryName(country);

            return parks;
        }

        const parsedData: SearchItemType = JSON.parse(searchItems);
        const parks: ParkSearchType[] = parsedData.parks;

        // Filter parks by country name (normalize both sides)
        const matchingParks = parks.filter(
            (park) => park.country.trim().toLowerCase() === country.trim().toLowerCase()
        );

        return matchingParks;

    } catch (error) {
        throw Error(`Error Loading Parks By Country Name`);
    }
};

// Get Experiences (experiences-tab-content.tsx)
export async function getExperiences() {
    // Retrieve data from localStorage
    const searchItems = localStorage.getItem("searchItems");

    try {
        if (!searchItems) {
            // Load experiences directly from the Database if not in localStorage
            const experiences = await getExperiencesFromDB();

            return experiences;
        }

        const parsedData: SearchItemType = JSON.parse(searchItems);
        const experiences: ExperienceType[] = parsedData.experiences;

        // Normalize both sides to handle extra spaces or case differences
        return experiences;

    } catch (error) {
        throw Error(`Error Loading Experiences`);
    }
};

// Load Tours for Selected Park (parks-tab-content.tsx)
export const loadToursForSelectedPark = async ({
    selectedPark,
    activeTab,
    searchParams,
    router,
    setSearchItemType,
    setSearchItemId
}: LoadToursByParkParams) => {
    try {
        // Get States and Actions from Tours Store
        const { setResultsState, loadTours, resetPagination } = useToursStore.getState();

        // Get States and Actions from Filters Store
        const { setAppliedFilters, setFilters, setSortBy, setPricedBy } = useFiltersStore.getState();

        setResultsState("loading");
        if (!selectedPark) return;

        // Set selected active tab and park in URL
        tourSearchUrlHandler.setActiveTab({
            activeTab,
            parkId: selectedPark.id,
            searchParams,
            router,
        });

        // Set search item in parent component (for filtering handlers)
        setSearchItemType(selectedPark.type);
        setSearchItemId(selectedPark.id);

        // Fetch initial filters and sorting from URL
        const { filtersFromURL, sortingFromURL, pricedByFromURL } =
            tourSearchUrlHandler.getFiltersFromUrl(searchParams, setAppliedFilters);


        // Set filters from url into state
        setFilters(filtersFromURL);
        setSortBy(sortingFromURL);
        setPricedBy(pricedByFromURL);

        resetPagination();

        // Load tours based on selected park
        const tourResults = await loadTours(selectedPark.id, selectedPark.type, filtersFromURL, sortingFromURL, pricedByFromURL);

        if (tourResults) {
            if (tourResults.tours.length < 1) {
                setResultsState("void");
            } else {
                setResultsState("returned");
            }
        }

    } catch (error) {
        const { setResultsState } = useToursStore.getState();
        setResultsState("error");
        console.error("Error loading tours");
    }
};

// Load Initial Tours with URL Filters (all-tab-content.tsx)
export const loadInitialTours = async ({
    idInURL,
    typeInURL,
    activeTab,
    searchParams,
    router,
    setSearchItemType,
    setSearchItemId,
}: LoadInitialToursParams) => {
    try {

        // Get States and Actions from Tours Store
        const { setResultsState, loadTours, resetPagination } = useToursStore.getState();

        // Get States and Actions from Filters Store
        const { setAppliedFilters, setFilters, setSortBy, setPricedBy } = useFiltersStore.getState();

        setResultsState("loading");
        if (!idInURL || !typeInURL) return;

        // Add active tab to URL (in this case it's removed)
        tourSearchUrlHandler.setActiveTab({ activeTab, searchParams, router });

        // Set search item for parent component (used by filter handlers)
        setSearchItemType(typeInURL);
        setSearchItemId(idInURL);

        // Extract selected filters & sorting from URL
        const { filtersFromURL, sortingFromURL, pricedByFromURL } =
            tourSearchUrlHandler.getFiltersFromUrl(searchParams, setAppliedFilters);

        // Set filters from url in state
        setFilters(filtersFromURL);
        setSortBy(sortingFromURL);
        setPricedBy(pricedByFromURL);

        resetPagination();

        // Load tours using the initial values
        const tourResults = await loadTours(idInURL, typeInURL, filtersFromURL, sortingFromURL, pricedByFromURL);

        if (tourResults) {
            if (tourResults.tours.length < 1) {
                setResultsState("void");
            }
            else {
                setResultsState("returned");
            }
        }

    } catch (error) {
        // Set Results State to error if error occurs
        const { setResultsState } = useToursStore.getState();
        setResultsState("error");
        console.error("Error loading initial tours");
    }
};

// Load Tours for Selected Experience (experiences-tab-content.tsx)
export const loadToursForSelectedExperience = async ({
    selectedExperience,
    activeTab,
    searchParams,
    router,
    setSearchItemType,
    setSearchItemId,
    experienceDestination
}: LoadToursByExperienceParams) => {
    try {
        // Get States and Actions from Tours Store
        const { setResultsState, loadTours, resetPagination } = useToursStore.getState();

        // Get States and Actions from Filters Store
        const { setAppliedFilters, setFilters, setSortBy, setPricedBy } = useFiltersStore.getState();

        setResultsState("loading");
        if (!selectedExperience && !experienceDestination) return;

        // Set selected active tab and park in URL
        tourSearchUrlHandler.setActiveTab({
            activeTab,
            experienceId: selectedExperience.id,
            searchParams,
            router,
        });

        // Set search item in parent component (for filtering handlers)
        setSearchItemType("experience");
        setSearchItemId(selectedExperience.id);

        // Fetch initial filters and sorting from URL
        const { filtersFromURL, sortingFromURL, pricedByFromURL } =
            tourSearchUrlHandler.getFiltersFromUrl(searchParams, setAppliedFilters);


        // Set filters from url into state
        setFilters(filtersFromURL);
        setSortBy(sortingFromURL);
        setPricedBy(pricedByFromURL);

        resetPagination();

        // Load tours based on selected park
        const tourResults = await loadTours(selectedExperience.id, "experience", filtersFromURL, sortingFromURL, pricedByFromURL, experienceDestination);

        if (tourResults) {
            if (tourResults.tours.length < 1) {
                setResultsState("void");
            } else {
                setResultsState("returned");
            }
        }

    } catch (error) {
        const { setResultsState } = useToursStore.getState();
        setResultsState("error");
        console.error("Error loading tours");
    }
};