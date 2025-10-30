import { paginationType, SortToursType, Tour, TourFiltersType } from "@/types/types"
import { DEFAULT_PAGINATION, fetchTours } from "@/utils/mordern-search.utils"
import { useState } from "react"

// Custom hook for managing tours data fetching and pagination
export function useTours(idParam: number, typeParam: string) {
    const [tours, setTours] = useState<Tour[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

    // Reset Pagination to default state
    const resetPagination = () => {
        setPagination(DEFAULT_PAGINATION);
    }

    // Fetch tours with given filters
    const loadTours = async (filters: TourFiltersType, sortBy: SortToursType, setTotalResults?: (total: number) => void) => {
        // Check if idParam and typeParam have been loaded
        if (!idParam || !typeParam) return;

        setTours([]);
        setIsLoading(true);
        try {
            await fetchTours(idParam, typeParam, DEFAULT_PAGINATION, setTours, setPagination, false, filters, sortBy, setTotalResults)
        } finally {
            setIsLoading(false)
        }
    }

    // Load more tours with given filters
    const loadMoreTours = async (filters: TourFiltersType, sortBy: SortToursType) => {
        // Check if idParam and typeParam have been loaded
        if (!idParam || !typeParam) return;

        setIsLoadingMore(true)
        try {
            await fetchTours(idParam, typeParam, pagination, setTours, setPagination, true, filters, sortBy)
        } finally {
            setIsLoadingMore(false)
        }
    }

    return { tours, pagination, isLoading, setPagination, loadTours, resetPagination, loadMoreTours, isLoadingMore, setIsLoading }
}