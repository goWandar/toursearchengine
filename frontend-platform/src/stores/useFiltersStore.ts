import { create } from "zustand";
import { tourSearchUrlHandler } from "@/utils/free-search.utils";
import { useToursStore } from "./useTourStore";
import { DEFAULT_FILTERS } from "@/utils/constants.utils";
import { FiltersState } from "@/types/free-search.types";

export const useFiltersStore = create<FiltersState>((set, get) => ({
    filters: DEFAULT_FILTERS,
    sortBy: "default",
    pricedBy: { persons: 2 },
    appliedFilters: DEFAULT_FILTERS,

    setFilters: (filters) => set({ filters }),
    setSortBy: (sortBy) => set({ sortBy }),
    setAppliedFilters: (appliedFilters) => set({ appliedFilters }),
    setPricedBy: (pricedBy) => set({ pricedBy }),

    // Reset Filters Handler
    resetFilters: async ({ idParam, typeParam, searchParams, router, destinationData }) => {
        try {
            // Get States and Actions from Tours Store
            const {
                setResultsState,
                loadTours,
                resetPagination
            } = useToursStore.getState();

            // Set Results State to loading
            setResultsState("loading");

            const { sortBy, pricedBy } = get();

            // Set Filters to Default Filters
            set({
                filters: DEFAULT_FILTERS,
                appliedFilters: DEFAULT_FILTERS,
            });

            // Remove Filters from URL
            tourSearchUrlHandler.resetFilters({ searchParams, router });

            // Reset Pagination
            resetPagination();

            // Fetch tours without filters
            const tourResults = await loadTours(idParam, typeParam, DEFAULT_FILTERS, sortBy, pricedBy, destinationData);


            if (tourResults) {
                if (tourResults.tours.length < 1) {
                    setResultsState("void");
                } else {
                    setResultsState("returned");
                }
            }

        } catch (error) {
            // Set Results State to error
            const { setResultsState } = useToursStore.getState();
            setResultsState("error");
            console.error("Error resetting filters");
        }
    },

    // Apply filters handler
    applyFilters: async ({ idParam, typeParam, searchParams, router, destinationData }) => {
        try {
            // Get States and Actions from Tours Store
            const {
                setResultsState,
                loadTours,
                resetPagination
            } = useToursStore.getState();

            const { filters, sortBy, pricedBy } = get();

            // Set Results State to loading
            setResultsState("loading");

            // Set applied filters(for ui)
            set({ appliedFilters: filters });

            // Reset Pagination
            resetPagination();

            // Set Filters in URL
            tourSearchUrlHandler.setFilters({ filters, searchParams, router });

            // Load Tours
            const tourResults = await loadTours(idParam, typeParam, filters, sortBy, pricedBy, destinationData);

            if (tourResults) {
                if (tourResults.tours.length < 1) {
                    setResultsState("void");
                } else {
                    setResultsState("returned");
                }
            }

        } catch (error) {
            // Set Results State to error
            const { setResultsState } = useToursStore.getState();
            setResultsState("error");

            console.error("Error applying filters");
        }
    },

    // Sort tours handler
    sortTours: async ({ idParam, typeParam, searchParams, router, sortBy, destinationData }) => {
        try {
            // Get States and Actions from Tours Store
            const {
                setResultsState,
                loadTours,
                resetPagination
            } = useToursStore.getState();

            const { filters, pricedBy } = get();

            // Set Results State to loading
            setResultsState("loading");

            // Set Selected Sorting
            set({ sortBy });

            // Add Sorting to URL
            tourSearchUrlHandler.setSortBy({ sortBy, searchParams, router });

            // Reset Pagination
            resetPagination();

            // Load Tours
            const tourResults = await loadTours(idParam, typeParam, filters, sortBy, pricedBy, destinationData);

            if (tourResults) {
                if (tourResults.tours.length < 1) {
                    setResultsState("void");
                } else {
                    setResultsState("returned");
                }
            }

        } catch (error) {
            // Set Results State to error
            const { setResultsState } = useToursStore.getState();
            setResultsState("error");

            console.error("Error sorting tours:", error);
        }
    },

    setNumberOfPersons: async ({ idParam, typeParam, searchParams, router, priceBy, destinationData }) => {
        try {
            // Get States and Actions from Tours Store
            const {
                setResultsState,
                loadTours,
                resetPagination
            } = useToursStore.getState();

            const { filters, sortBy } = get();

            // Set Results State to loading
            setResultsState("loading");

            // Set Selected priceBy
            set({ pricedBy: priceBy });

            // Add pricedBy to URL
            tourSearchUrlHandler.setPricedBy({ pricedBy: priceBy, searchParams, router });

            // Reset Pagination
            resetPagination();

            // Load Tours
            const tourResults = await loadTours(idParam, typeParam, filters, sortBy, priceBy, destinationData);

            if (tourResults) {
                if (tourResults.tours.length < 1) {
                    setResultsState("void");
                } else {
                    setResultsState("returned");
                }
            }

        } catch (error) {
            // Set Results State to error
            const { setResultsState } = useToursStore.getState();
            setResultsState("error");

            console.error("Error fetching tours by number of persons");
        }
    },
}));
