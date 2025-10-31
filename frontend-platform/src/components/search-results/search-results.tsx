"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';
import { SortToursType } from "@/types/types";
import { useToursStore } from "@/stores/useTourStore";
import { useFiltersStore } from "@/stores/useFiltersStore";

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = decodeURIComponent(params.name as string);
    const idParam = Number(searchParams?.get("id"));
    const typeParam = (searchParams?.get("type")) ?? "";

    // Tours hook
    const { isLoading, loadTours, resetPagination, pagination } = useToursStore()

    // Filters Hook
    const { filters, setFilters, sortBy, setSortBy, applyFilters, resetFilters, sortTours } = useFiltersStore();

    const handleApplyFilters = () => applyFilters({
        idParam,
        typeParam,
        filters,
        sortBy,
        searchParams,
        router,
        resetPagination,
        loadTours,
    });

    const handleResetFilters = () => resetFilters({
        idParam,
        typeParam,
        searchParams,
        sortBy,
        router,
        resetPagination,
        loadTours,
    });

    const handleSortTours = (sort: SortToursType) => sortTours({
        idParam,
        typeParam,
        filters,
        sortBy: sort,
        searchParams,
        router,
        resetPagination,
        loadTours,
        setSortBy
    });

    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Header */}
            <ResultsFilters name={name} isLoading={isLoading}
                filters={filters} setFilters={setFilters} applyFilters={handleApplyFilters} resetFilters={handleResetFilters}
                handleSortTours={handleSortTours} sortBy={sortBy} pagination={pagination}
            />

            {/* Main Content */}
            <ResultsTabs isLoading={isLoading}
                searchItemType={typeParam} searchItemName={name} searchItemId={idParam}
                searchParams={searchParams}
            />
        </div >
    )
};
