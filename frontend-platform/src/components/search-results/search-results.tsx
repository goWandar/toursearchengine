"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';
import { SortToursType } from "@/types/types";
import { useToursStore } from "@/stores/useTourStore";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useState } from "react";

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = decodeURIComponent(params.name as string);
    const idFromURL = Number(searchParams?.get("id")) || 0;
    const typeFromURL = searchParams?.get("type") ?? "";
    const [id, setId] = useState<number>(idFromURL);
    const [type, setType] = useState<string>(typeFromURL);

    // Tours hook
    const { isLoading, loadTours, resetPagination, pagination } = useToursStore()

    // Filters Hook
    const { filters, setFilters, sortBy, setSortBy, applyFilters, resetFilters,
        sortTours, setIsFiltersApplied } = useFiltersStore();

    const handleApplyFilters = () => applyFilters({
        idParam: id,
        typeParam: type,
        filters,
        sortBy,
        searchParams,
        router,
        resetPagination,
        loadTours,
        setIsFiltersApplied
    });

    const handleResetFilters = () => resetFilters({
        idParam: id,
        typeParam: type,
        searchParams,
        sortBy,
        router,
        resetPagination,
        loadTours,
        setIsFiltersApplied
    });

    const handleSortTours = (sort: SortToursType) => sortTours({
        idParam: id,
        typeParam: type,
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
            {/* Search Results Filters - Header */}
            <ResultsFilters name={name} isLoading={isLoading}
                filters={filters} setFilters={setFilters} applyFilters={handleApplyFilters} resetFilters={handleResetFilters}
                handleSortTours={handleSortTours} sortBy={sortBy} pagination={pagination}
            />

            {/* Search Results Content */}
            <ResultsTabs isLoading={isLoading}
                searchItemType={type} searchItemName={name} searchItemId={id}
                searchParams={searchParams} router={router}
                setSearchItemType={setType} setSearchItemId={setId}
            />
        </div >
    )
};
