import { TourFiltersType } from "@/types/types"
import { applyFiltersHelper, DEFAULT_FILTERS, resetFiltersHelper } from "@/utils/mordern-search.utils"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useState } from "react"

// Custom hook for managing tour filters
export function useFilters({
    searchParams,
    router,
    resetPagination,
}: {
    searchParams: URLSearchParams;
    router: AppRouterInstance;
    resetPagination: () => void;
}) {
    const [filters, setFilters] = useState<TourFiltersType>(DEFAULT_FILTERS);

    // Apply Filters and update URL
    const applyFilters = () => {
        resetPagination();
        applyFiltersHelper({ filters, searchParams, router })
    }

    // Reset Selected Filters and update URL
    const resetFilters = () => {
        setFilters(DEFAULT_FILTERS)
        resetPagination()
        resetFiltersHelper({ searchParams, router })
    }

    return { filters, setFilters, applyFilters, resetFilters }
}

