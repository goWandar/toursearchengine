import { create } from "zustand";
import { TourFiltersType, SortToursType } from "@/types/types";
import { applyFiltersHelper, applySortByHelper, DEFAULT_FILTERS, resetFiltersHelper } from "@/utils/mordern-search.utils";

interface FiltersState {
    filters: TourFiltersType;
    sortBy: SortToursType;
    isFiltersApplied: boolean;
    setFilters: (filters: TourFiltersType) => void;
    setSortBy: (sortBy: SortToursType) => void;
    setIsFiltersApplied: (value: boolean) => void;

    resetFilters: (deps: {
        idParam: number;
        typeParam: string;
        sortBy: SortToursType;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (idParam: number, typeParam: string, filters: TourFiltersType, sortBy: SortToursType) => Promise<void>;
        setIsFiltersApplied: (value: boolean) => void;
    }) => Promise<void>;

    applyFilters: (deps: {
        idParam: number;
        typeParam: string;
        filters: TourFiltersType;
        sortBy: SortToursType;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (idParam: number, typeParam: string, filters: TourFiltersType, sortBy: SortToursType) => Promise<void>;
        setIsFiltersApplied: (value: boolean) => void;
    }) => Promise<void>;

    sortTours: (deps: {
        idParam: number;
        typeParam: string;
        filters: TourFiltersType;
        sortBy: SortToursType;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (idParam: number, typeParam: string, filters: TourFiltersType, sortBy: SortToursType) => Promise<void>;
        setSortBy: (value: SortToursType) => void;
    }) => Promise<void>;
}

export const useFiltersStore = create<FiltersState>((set) => ({
    filters: DEFAULT_FILTERS,
    sortBy: "relevance",
    isFiltersApplied: false,

    setFilters: (filters) => set({ filters }),
    setSortBy: (sortBy) => set({ sortBy }),

    setIsFiltersApplied: (value) => set({ isFiltersApplied: value }),

    resetFilters: async ({ idParam, typeParam, searchParams, sortBy, router, resetPagination, loadTours, setIsFiltersApplied }) => {
        try {
            setIsFiltersApplied(false);
            set({ filters: DEFAULT_FILTERS, sortBy: sortBy });
            resetFiltersHelper({ searchParams, router });
            resetPagination();
            await loadTours(idParam, typeParam, DEFAULT_FILTERS, sortBy);
        } catch (error) {
            console.error("Error resetting filters:", error);
        }
    },

    applyFilters: async ({ idParam, typeParam, filters, sortBy, searchParams, router, resetPagination, loadTours, setIsFiltersApplied }) => {
        try {
            setIsFiltersApplied(true);
            resetPagination();
            applyFiltersHelper({ filters, searchParams, router });
            await loadTours(idParam, typeParam, filters, sortBy);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    },

    sortTours: async ({ idParam, typeParam, filters, sortBy, searchParams, router, resetPagination, loadTours, setSortBy }) => {
        try {
            applySortByHelper({ sortBy, searchParams, router });
            if (setSortBy) setSortBy(sortBy);
            resetPagination();
            await loadTours(idParam, typeParam, filters, sortBy);
        } catch (error) {
            console.error("Error sorting tours:", error);
        }
    },
}));
