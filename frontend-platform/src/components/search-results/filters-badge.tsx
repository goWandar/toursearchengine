import { Badge } from '@/recipes/badge/badge';
import { TourFiltersType } from '@/types/types';
import { FilterIcon, SortDescIcon } from 'lucide-react';
import React from 'react'

interface FiltersBadgeProps {
    appliedFilters: TourFiltersType;
    sortBy: string;
    DEFAULT_FILTERS: TourFiltersType;
}

const FiltersBadge = ({
    appliedFilters,
    sortBy,
    DEFAULT_FILTERS
}: FiltersBadgeProps
) => {
    return (
        <div className='py-2'>
            <div className="flex flex-row py-2 gap-2">
                {(appliedFilters !== DEFAULT_FILTERS)
                    && (
                        <div className="flex flex-wrap items-center gap-2">
                            <FilterIcon className="text-green-800  h-4 w-4" />

                            {(appliedFilters.budget[0] !== 100 || appliedFilters.budget[1] !== 20000) && (
                                <Badge variant="secondary">
                                    Budget: {appliedFilters.budget[0]} - {appliedFilters.budget[1]} USD
                                </Badge>
                            )}

                            {(appliedFilters.duration[0] !== 1 || appliedFilters.duration[1] !== 14) && (
                                <Badge variant="secondary">
                                    Duration: {appliedFilters.duration[0]} - {appliedFilters.duration[1]} days
                                </Badge>
                            )}

                            {appliedFilters.accommodation.length > 0 && (
                                <Badge variant="secondary">
                                    Accommodation: {appliedFilters.accommodation.join(", ")}
                                </Badge>
                            )}
                        </div>
                    )}
            </div>

            <div className="flex flex-row py-2 gap-2">
                {sortBy !== "default"
                    && (
                        <div className="flex flex-row  items-center gap-2">
                            <SortDescIcon className="text-green-800 h-4 w-4" />
                            <Badge variant="secondary">
                                {sortBy === "budget_low_high" && "Budget (Low to High)"}
                                {sortBy === "budget_high_low" && "Budget (High to Low)"}
                                {sortBy === "duration_short_long" && "Duration (Short to Long)"}
                                {sortBy === "duration_long_short" && "Duration (Long to Short)"}
                            </Badge>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default FiltersBadge