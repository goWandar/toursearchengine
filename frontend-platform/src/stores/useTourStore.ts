import { create } from "zustand";
import { ToursStateType } from "@/types/free-search.types";
import { DEFAULT_PAGINATION } from "@/utils/constants.utils";
import { getToursByCountryId, getToursByParkId } from "@/lib/api/free-search.api";

export const useToursStore = create<ToursStateType>((set, get) => ({
    tours: [],
    pagination: DEFAULT_PAGINATION,

    resultsState: "loading",
    isLoadingMore: false,

    setPagination: (pagination) => set({ pagination }),
    setResultsState: (value) => set({ resultsState: value }),
    resetPagination: () => set({ pagination: DEFAULT_PAGINATION }),

    // Internal Fetch Tours Method
    internalFetchTours: async (
        id,
        type,
        paginationMeta,
        setTourResults,
        setPaginationMeta,
        isLoadMore,
        filters,
        sortBy,
        pricedBy
    ) => {
        try {
            const pageToFetch = isLoadMore ? paginationMeta.page + 1 : paginationMeta.page;
            const updatedPaginationMeta = { ...paginationMeta, page: pageToFetch };

            let fetchedTours;

            if (type === "park") {
                fetchedTours = await getToursByParkId(
                    id,
                    updatedPaginationMeta,
                    filters,
                    sortBy,
                    pricedBy
                );
            } else if (type === "country") {
                fetchedTours = await getToursByCountryId(
                    id,
                    updatedPaginationMeta,
                    filters,
                    sortBy,
                    pricedBy
                );
            } else {
                throw new Error(`Unknown type: ${type}`);
            }

            // Append or replace
            setTourResults((prev) =>
                isLoadMore ? [...prev, ...fetchedTours.tours] : fetchedTours.tours
            );

            // Update pagination meta
            setPaginationMeta(fetchedTours.pagination);

            return fetchedTours;
        } catch (err) {
            throw err;
        }
    },

    // Load Tours(For initial load and filters/sort change)
    loadTours: async (idParam, typeParam, filters, sortBy, pricedBy) => {
        if (!idParam || !typeParam) return;

        try {
            return await get().internalFetchTours(
                idParam,
                typeParam,
                DEFAULT_PAGINATION,
                (updateFn) =>
                    set((state) => ({
                        tours:
                            typeof updateFn === "function"
                                ? updateFn(state.tours)
                                : updateFn,
                    })),
                (updateFn) =>
                    set((state) => ({
                        pagination:
                            typeof updateFn === "function"
                                ? updateFn(state.pagination)
                                : updateFn,
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

    // Load Tours (For Load More)
    loadMoreTours: async (idParam, typeParam, filters, sortBy, pricedBy) => {
        if (!idParam || !typeParam) return;

        const { pagination } = get();
        set({ isLoadingMore: true });

        try {
            await get().internalFetchTours(
                idParam,
                typeParam,
                pagination,
                (updateFn) =>
                    set((state) => ({
                        tours:
                            typeof updateFn === "function"
                                ? updateFn(state.tours)
                                : updateFn,
                    })),
                (updateFn) =>
                    set((state) => ({
                        pagination:
                            typeof updateFn === "function"
                                ? updateFn(state.pagination)
                                : updateFn,
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
