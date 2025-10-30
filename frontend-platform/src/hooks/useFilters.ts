import { TourFiltersType, SortToursType } from "@/types/types"
import { DEFAULT_FILTERS } from "@/utils/mordern-search.utils"
import { useState } from "react"

// Custom hook for managing tour filters
export function useFilters() {
    const [filters, setFilters] = useState<TourFiltersType>(DEFAULT_FILTERS);
    const [sortBy, setSortBy] = useState<SortToursType>("relevance");

    return { filters, setFilters, sortBy, setSortBy }
};

