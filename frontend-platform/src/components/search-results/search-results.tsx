"use client";
import { applyFiltersHandler, DEFAULT_FILTERS, getQueriesFromSearchParams, resetFiltersHandler, sortToursHandler, } from "@/utils/mordern-search.utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@/recipes/button/button';
import { ChevronDown } from 'lucide-react';
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';
import { useTours } from "@/hooks/useTours";
import { SortToursType, TourFiltersType } from "@/types/types";
import { useFilters } from "@/hooks/useFilters";

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = decodeURIComponent(params.name as string);
    const idParam = Number(searchParams?.get("id"));
    const typeParam = (searchParams?.get("type")) ?? "";
    const [totalResults, setTotalResults] = useState(0);

    // Tours hook
    const { isLoading, loadTours, resetPagination } = useTours(idParam, typeParam)

    // Filters Hook
    const { filters, setFilters, sortBy, setSortBy } = useFilters();

    const handleApplyFilters = () => applyFiltersHandler({
        filters,
        sortBy,
        searchParams,
        router,
        resetPagination,
        loadTours,
    });

    const handleResetFilters = () => resetFiltersHandler({
        filters,
        sortBy,
        searchParams,
        router,
        resetPagination,
        loadTours,
        setFilters,
    });

    const handleSortTours = (sort: SortToursType) => sortToursHandler({
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
            <ResultsFilters name={name} isLoading={isLoading} totalResults={totalResults}
                filters={filters} setFilters={setFilters} applyFilters={handleApplyFilters} resetFilters={handleResetFilters}
                handleSortTours={handleSortTours} sortBy={sortBy}
            />

            {/* Main Content */}
            <ResultsTabs isLoading={isLoading}
                searchItemType={typeParam} searchItemName={name} searchItemId={idParam}
                searchParams={searchParams} setTotalResults={setTotalResults}
                totalResults={totalResults}
            />
        </div >
    )
};
