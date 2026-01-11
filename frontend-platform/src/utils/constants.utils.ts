import { paginationType, TourFiltersType } from "@/types/free-search.types"

// Default filter values
export const DEFAULT_FILTERS: TourFiltersType = { accommodation: [], budget: [100, 20000], duration: [1, 14] }

// Default pagination values
export const DEFAULT_PAGINATION: paginationType = { page: 1, limit: 12, total: 0, totalPages: 0, hasMore: false }