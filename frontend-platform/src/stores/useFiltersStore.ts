import { create } from "zustand";
import { TourFiltersType, SortToursType } from "@/types/types";
import { tourSearchUrlHandler, DEFAULT_FILTERS } from "@/utils/mordern-search.utils";

interface FiltersState {
    filters: TourFiltersType;
    sortBy: SortToursType;
    appliedFilters: TourFiltersType;
    setFilters: (filters: TourFiltersType) => void;
    setSortBy: (sortBy: SortToursType) => void;
    setAppliedFilters: (appliedFilters: TourFiltersType) => void;

    resetFilters: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (
            idParam: number,
            typeParam: string,
            filters: TourFiltersType,
            sortBy: SortToursType
        ) => Promise<void>;
    }) => Promise<void>;

    applyFilters: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (
            idParam: number,
            typeParam: string,
            filters: TourFiltersType,
            sortBy: SortToursType
        ) => Promise<void>;
    }) => Promise<void>;

    sortTours: (deps: {
        idParam: number;
        typeParam: string;
        searchParams: any;
        router: any;
        resetPagination: () => void;
        loadTours: (
            idParam: number,
            typeParam: string,
            filters: TourFiltersType,
            sortBy: SortToursType
        ) => Promise<void>;
        sortBy: SortToursType;
    }) => Promise<void>;
}

export const useFiltersStore = create<FiltersState>((set, get) => ({
    filters: DEFAULT_FILTERS,
    sortBy: "default",
    appliedFilters: DEFAULT_FILTERS,

    setFilters: (filters) => set({ filters }),
    setSortBy: (sortBy) => set({ sortBy }),
    setAppliedFilters: (appliedFilters) => set({ appliedFilters }),

    resetFilters: async ({ idParam, typeParam, searchParams, router, resetPagination, loadTours }) => {
        try {
            const { sortBy } = get();

            set({
                filters: DEFAULT_FILTERS,
                appliedFilters: DEFAULT_FILTERS,
            });

            tourSearchUrlHandler.resetFilters({ searchParams, router });
            resetPagination();

            await loadTours(idParam, typeParam, DEFAULT_FILTERS, sortBy);
        } catch (error) {
            console.error("Error resetting filters:", error);
        }
    },

    applyFilters: async ({ idParam, typeParam, searchParams, router, resetPagination, loadTours }) => {
        try {
            const { filters, sortBy } = get();

            set({ appliedFilters: filters });

            resetPagination();
            tourSearchUrlHandler.setFilters({ filters, searchParams, router });

            await loadTours(idParam, typeParam, filters, sortBy);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    },

    sortTours: async ({ idParam, typeParam, searchParams, router, resetPagination, loadTours, sortBy }) => {
        try {
            const { filters } = get();

            set({ sortBy });
            tourSearchUrlHandler.setSortBy({ sortBy, searchParams, router });

            resetPagination();
            await loadTours(idParam, typeParam, filters, sortBy);
        } catch (error) {
            console.error("Error sorting tours:", error);
        }
    },
}));
