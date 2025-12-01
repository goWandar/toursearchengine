import { Badge } from '@/recipes/badge/badge';
import { TourFiltersType } from '@/types/free-search.types';
import { FilterIcon, SortDescIcon } from 'lucide-react';

interface FiltersBadgeProps {
    appliedFilters: TourFiltersType;
    sortBy: string;
    DEFAULT_FILTERS: TourFiltersType;
}

const FiltersBadge = ({
    appliedFilters,
    sortBy,
    DEFAULT_FILTERS
}: FiltersBadgeProps) => {

    // Checks
    const hasBudget =
        appliedFilters.budget[0] !== DEFAULT_FILTERS.budget[0] ||
        appliedFilters.budget[1] !== DEFAULT_FILTERS.budget[1];

    const hasDuration =
        appliedFilters.duration[0] !== DEFAULT_FILTERS.duration[0] ||
        appliedFilters.duration[1] !== DEFAULT_FILTERS.duration[1];

    const hasAccommodation = appliedFilters.accommodation.length > 0;

    const hasAnyFilter = hasBudget || hasDuration || hasAccommodation;

    const hasSorting = sortBy !== "default";

    return (
        <div className="py-2">

            {/* Filters Section */}
            {hasAnyFilter && (
                <div className="flex flex-row py-2 gap-2">
                    <div className="flex flex-wrap items-center gap-2">

                        <FilterIcon className="text-green-800 h-4 w-4" />

                        {hasBudget && (
                            <Badge variant="secondary">
                                Budget: {appliedFilters.budget[0]} - {appliedFilters.budget[1]} USD
                            </Badge>
                        )}

                        {hasDuration && (
                            <Badge variant="secondary">
                                Duration: {appliedFilters.duration[0]} - {appliedFilters.duration[1]} days
                            </Badge>
                        )}

                        {hasAccommodation && (
                            <Badge variant="secondary">
                                Accommodation: {appliedFilters.accommodation.join(", ")}
                            </Badge>
                        )}
                    </div>
                </div>
            )}

            {/* Sorting Section */}
            {hasSorting && (
                <div className="flex flex-row py-2 gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <SortDescIcon className="text-green-800 h-4 w-4" />

                        <Badge variant="secondary">
                            {sortBy === "budget_low_high" && "Budget (Low to High)"}
                            {sortBy === "budget_high_low" && "Budget (High to Low)"}
                            {sortBy === "duration_short_long" && "Duration (Short to Long)"}
                            {sortBy === "duration_long_short" && "Duration (Long to Short)"}
                        </Badge>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FiltersBadge;