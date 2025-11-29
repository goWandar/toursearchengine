import { create } from "zustand";
import { fetchTours } from "@/utils/mordern-search.utils";
import { paginationType, Tour, TourFiltersType, SortToursType, TourSearchResponse, ToursPricedByType } from "@/types/types";
import { ResultsStateType } from "@/types/free-search.types";
import { DEFAULT_PAGINATION } from "@/utils/constants.utils";



export interface ToursState {
    tours: Tour[];
    pagination: paginationType;

    resultsState: ResultsStateType;
    isLoadingMore: boolean;

    setPagination: (pagination: paginationType) => void;
    setResultsState: (value: ResultsStateType) => void;
    resetPagination: () => void;

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

export const useToursStore = create<ToursState>((set, get) => ({
    tours: [],
    pagination: DEFAULT_PAGINATION,

    resultsState: "loading",
    isLoadingMore: false,

    setPagination: (pagination) => set({ pagination }),
    setResultsState: (value) => set({ resultsState: value }),
    resetPagination: () => set({ pagination: DEFAULT_PAGINATION }),

    // Load tours with given filters
    loadTours: async (idParam, typeParam, filters, sortBy, pricedBy) => {
        if (!idParam || !typeParam) return;

        try {

            return await fetchTours(
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
                pricedBy
            );

        } catch (err) {
            throw err;
        }
    },

    // Load more tours with given filters
    loadMoreTours: async (idParam, typeParam, filters, sortBy, pricedBy) => {
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
                sortBy,
                pricedBy
            );
        } finally {
            set({ isLoadingMore: false });
        }
    },
}));
