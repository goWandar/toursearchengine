"use client";

import { useFiltersStore } from "@/stores/useFiltersStore";
import { useToursStore } from "@/stores/useTourStore";
import FiltersPopover from "./filters-popover";
import { useRouter } from "next/navigation";
import SortSelect from "./sort-select";
import FiltersBadge from "./filters-badge";
import { DEFAULT_FILTERS } from "@/utils/constants.utils";
import { ExperienceDestinationType, SortToursType } from "@/types/free-search.types";
import DynamicPricing from "./dynamic-pricing";

interface ResultsHeaderProps {
    searchParams: URLSearchParams;
    name?: string;
    searchItemId: number;
    searchItemType: string;
    destinationData: ExperienceDestinationType | undefined;
}

const ResultsHeader = ({ name, searchParams, searchItemId, searchItemType, destinationData }: ResultsHeaderProps) => {
    const router = useRouter();

    // Tours Store State
    const sortBy = useFiltersStore((state) => state.sortBy);
    const sortTours = useFiltersStore((state) => state.sortTours);
    const filters = useFiltersStore((state) => state.filters);
    const setFilters = useFiltersStore((state) => state.setFilters);
    const applyFilters = useFiltersStore((state) => state.applyFilters);
    const resetFilters = useFiltersStore((state) => state.resetFilters);
    const appliedFilters = useFiltersStore((state) => state.appliedFilters);

    // Tours Store state
    const resultsState = useToursStore((state) => state.resultsState);
    const pagination = useToursStore((state) => state.pagination);

    const handleApplyFilters = () => applyFilters({
        idParam: searchItemId,
        typeParam: searchItemType,
        searchParams,
        router,
        destinationData: searchItemType === "experience" ? destinationData : undefined,
    });

    const handleResetFilters = () => resetFilters({
        idParam: searchItemId,
        typeParam: searchItemType,
        searchParams,
        router,
        destinationData: searchItemType === "experience" ? destinationData : undefined,
    });

    const handleSortTours = (sort: SortToursType) => sortTours({
        idParam: searchItemId,
        typeParam: searchItemType,
        sortBy: sort,
        searchParams,
        router,
        destinationData: searchItemType === "experience" ? destinationData : undefined,
    });


    return (
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8">
            {/* Title and Results Count */}
            <div className="mb-3 lg:mb-0">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">
                        {name ? `Search results for "${name}"` : "All Safari Options"}
                    </h1>

                    {/* Filters Stickers */}
                    <FiltersBadge
                        appliedFilters={appliedFilters}
                        sortBy={sortBy}
                        DEFAULT_FILTERS={DEFAULT_FILTERS}
                    />
                </div>
                {/* Results Count */}
                {(resultsState === "returned" && pagination.total > 0)
                    && (
                        <p className="text-lg text-gray-600">{pagination.total} results found</p>
                    )}
            </div>

            <div className="flex flex-col justify-between space-y-8">
                <div className="flex justify-between items-center space-x-4">
                    {/* Filter Tours Popover */}
                    <FiltersPopover
                        filters={filters}
                        setFilters={setFilters}
                        handleApplyFilters={handleApplyFilters}
                        handleResetFilters={handleResetFilters}
                        resultsState={resultsState}
                    />

                    {/* Sort Tours Selector */}
                    <SortSelect
                        handleSortTours={handleSortTours}
                        sortBy={sortBy}
                        resultsState={resultsState}
                    />
                </div>
                {/* Pricing By Number of People Slider */}
                <DynamicPricing
                    searchItemType={searchItemType}
                    searchItemId={searchItemId}
                    searchParams={searchParams}
                    isLoading={resultsState === "loading"}
                    destinationData={destinationData}
                />
            </div>
        </div>
    );
};

export default ResultsHeader;
