import { create } from "zustand";
import { DEFAULT_PAGINATION, fetchTours } from "@/utils/mordern-search.utils";
import { paginationType, Tour, TourFiltersType, SortToursType } from "@/types/types";

export interface ToursState {
    tours: Tour[];
    pagination: paginationType;
    isLoading: boolean;
    isLoadingMore: boolean;

    setPagination: (pagination: paginationType) => void;
    setIsLoading: (value: boolean) => void;
    resetPagination: () => void;

    loadTours: (
        idParam: number,
        typeParam: string,
        filters: TourFiltersType,
        sortBy: SortToursType,
    ) => Promise<void>;

    loadMoreTours: (
        idParam: number,
        typeParam: string,
        filters: TourFiltersType,
        sortBy: SortToursType
    ) => Promise<void>;
}

export const useToursStore = create<ToursState>((set, get) => ({
    tours: [],
    pagination: DEFAULT_PAGINATION,
    isLoading: false,
    isLoadingMore: false,

    setPagination: (pagination) => set({ pagination }),
    setIsLoading: (value) => set({ isLoading: value }),
    resetPagination: () => set({ pagination: DEFAULT_PAGINATION }),

    // Load tours with given filters
    loadTours: async (idParam, typeParam, filters, sortBy) => {
        if (!idParam || !typeParam) return;

        try {

            await fetchTours(
                idParam,
                typeParam,
                DEFAULT_PAGINATION,
                (updateFn) =>
                    set((state) => ({
                        tours: typeof updateFn === "function" ? updateFn(state.tours) : updateFn,
                    })),
                (updateFn) =>
                    set((state) => ({
                        pagination:
                            typeof updateFn === "function" ? updateFn(state.pagination) : updateFn,
                    })),
                false,
                filters,
                sortBy,
            );
        } finally {
            set({ isLoading: false });
        }
    },

    // Load more tours with given filters
    loadMoreTours: async (idParam, typeParam, filters, sortBy) => {
        if (!idParam || !typeParam) return;

        const { pagination } = get();
        set({ isLoadingMore: true });

        try {
            await fetchTours(
                idParam,
                typeParam,
                pagination,
                (updateFn) =>
                    set((state) => ({
                        tours: typeof updateFn === "function" ? updateFn(state.tours) : updateFn,
                    })),
                (updateFn) =>
                    set((state) => ({
                        pagination:
                            typeof updateFn === "function" ? updateFn(state.pagination) : updateFn,
                    })),
                true,
                filters,
                sortBy
            );
        } finally {
            set({ isLoadingMore: false });
        }
    },
}));
