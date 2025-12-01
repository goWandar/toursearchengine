import { Tour } from "./types";

// Tour Results State Type
export type ResultsStateType = "void" | "loading" | "returned" | "error";

// useTourStore State Type (useTourStore.ts)
export interface ToursStateType {
    tours: Tour[];
    pagination: paginationType;

    resultsState: ResultsStateType;
    isLoadingMore: boolean;

    setPagination: (pagination: paginationType) => void;
    setResultsState: (value: ResultsStateType) => void;
    resetPagination: () => void;

    internalFetchTours: (
        id: number,
        type: string,
        paginationMeta: paginationType,
        setTourResults: (updateFn: ((prev: Tour[]) => Tour[]) | Tour[]) => void,
        setPaginationMeta: (updateFn: ((prev: paginationType) => paginationType) | paginationType) => void,
        isLoadMore: boolean,
        filters: TourFiltersType,
        sortBy: SortToursType,
        pricedBy: ToursPricedByType
    ) => Promise<TourSearchResponse>;

    loadTours: (
        idParam: number,
        typeParam: string,
        filters: TourFiltersType,
        sortBy: SortToursType,
        pricedBy: ToursPricedByType
    ) => Promise<void | TourSearchResponse>;

    loadMoreTours: (
        idParam: number,
        typeParam: string,
        filters: TourFiltersType,
        sortBy: SortToursType,
        pricedBy: ToursPricedByType
    ) => Promise<void>;
}

// useFiltersStore State Type (useFiltersStore.ts)
export interface FiltersState {
    filters: TourFiltersType;
    sortBy: SortToursType;
    pricedBy: ToursPricedByType;
    appliedFilters: TourFiltersType;

    setFilters: (filters: TourFiltersType) => void;
    setSortBy: (sortBy: SortToursType) => void;
    setAppliedFilters: (appliedFilters: TourFiltersType) => void;
    setPricedBy: (pricedBy: ToursPricedByType) => void;

    resetFilters: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
    }) => Promise<void>;

    applyFilters: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
    }) => Promise<void>;

    sortTours: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
        sortBy: SortToursType;
    }) => Promise<void>;

    setNumberOfPersons: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
        priceBy: ToursPricedByType;
    }) => Promise<void>;
}

// Load Tours By Park Handler - Params Type (modern-search.utils.ts)
export interface LoadToursByParkParams {
    selectedPark: { id: number; type: string } | null;
    activeTab: ActiveTabType;
    searchParams: URLSearchParams;
    router: any;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
}

// Load Initial Tours Handler - Params Type (modern-search.utils.ts)
export interface LoadInitialToursParams {
    idInURL: number;
    typeInURL: string;
    activeTab: string;
    searchParams: URLSearchParams;
    router: any;
    setSearchItemType: (value: string) => void;
    setSearchItemId: (value: number) => void;
    tourSearchUrlHandler: {
        setActiveTab: (args: any) => void;
        getFiltersFromUrl: (
            params: URLSearchParams,
            setAppliedFilters: (filters: any) => void
        ) => {
            filtersFromURL: any;
            sortingFromURL: any;
        };
    };
}

// Get Filters from URL method - Return Type (modern-search.utils.ts)
export type FiltersFromUrlReturnType = {
    filtersFromURL: {
        accommodation: string[];
        duration: [number, number];
        budget: [number, number];
    };
    sortingFromURL: SortToursType;
    pricedByFromURL: {
        persons: number;
    };
};

// Tour Filters Type
export interface TourFiltersType {
    accommodation: string[];
    budget: [number, number];
    duration: [number, number];
}

export interface ToursPricedByType {
    persons: number;
}

//  Sort Tours Type
export type SortToursType =
    | "default"
    | "duration_short_long"
    | "duration_long_short"
    | "budget_low_high"
    | "budget_high_low";


// Active Tab Type
export type ActiveTabType = "all" | "parks" | "experiences";

// Tour Handler Dependencies Type
export type TourHandlerDeps = {
    idParam: number;
    typeParam: string;
    filters: TourFiltersType;
    sortBy: SortToursType;
    router: any;
    searchParams: any;
    resetPagination: () => void;
    loadTours: (
        idParam: number,
        typeParam: string,
        filters: TourFiltersType,
        sortBy: SortToursType,
    ) => Promise<void>;
    setFilters?: (filters: TourFiltersType) => void;
    setSortBy?: (value: SortToursType) => void;
};

// Park Search Suggestion Type
export interface ParkSearchType {
    id: number;
    name: string;
    country: string;
    keyword: string;
    type: string;
};

// Country Search Suggestion Type
export interface CountrySearchType {
    id: number;
    name: string;
    type: string;
};

export interface ParksCountriesType {
    parks: ParkSearchType[];
    countries: CountrySearchType[];
    popularParks: ParkSearchType[];
    trendingSearches: SuggestionType[];
}

// Combined Search Suggestion Type
export type SuggestionType = ParkSearchType | CountrySearchType;

// Pagination Meta Type
export interface paginationType {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
};

// Tour Search Response Type
export interface TourSearchResponse {
    tours: Tour[];
    pagination: paginationType;
}

