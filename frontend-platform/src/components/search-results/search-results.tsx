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

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = decodeURIComponent(params.name as string);
    const idParam = Number(searchParams?.get("id"));
    const typeParam = (searchParams?.get("type")) ?? "";
    const [filters, setFilters] = useState<TourFiltersType>(DEFAULT_FILTERS);
    const [sortBy, setSortBy] = useState<SortToursType>("relevance");

    // Tours hook
    const { tours, pagination, isLoading,
        loadTours, resetPagination,
        loadMoreTours, isLoadingMore } = useTours(idParam, typeParam)

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        const loadInitialTours = async () => {
            try {
                const { initialFilters, initialSorting } = getQueriesFromSearchParams(searchParams);
                setFilters(initialFilters)
                setSortBy(initialSorting);
                loadTours(initialFilters, initialSorting);
            } catch (error) {
                console.error("Error loading tours with initial filters:", error);
            }
        };
        loadInitialTours();
    }, [idParam, typeParam])

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
            <ResultsFilters name={name} isLoading={isLoading} totalResults={pagination.total}
                filters={filters} setFilters={setFilters} applyFilters={handleApplyFilters} resetFilters={handleResetFilters}
                handleSortTours={handleSortTours} sortBy={sortBy}
            />

            {/* Main Content */}
            <ResultsTabs paginationMeta={pagination} tourResults={tours} isLoading={isLoading} />

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() => loadMoreTours(filters, sortBy)}
                        className="flex items-center"
                        loading={isLoadingMore}
                        disabled={isLoadingMore}
                    >
                        {!isLoadingMore && <ChevronDown className="mr-2" />}
                        {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                )}
            </div>
        </div >
    )
};
