"use client";
import { DEFAULT_FILTERS, DEFAULT_PAGINATION, getFiltersFromSearchParams, } from "@/utils/mordern-search.utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from '@/recipes/button/button';
import { ChevronDown } from 'lucide-react';
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';
import { useTours } from "@/hooks/useTours";
import { useFilters } from "@/hooks/useFilters";

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const name = decodeURIComponent(params.name as string);
    const idParam = Number(searchParams?.get("id"));
    const typeParam = (searchParams?.get("type")) ?? "";

    // Tours hook
    const { tours, pagination, isLoading,
        loadTours, resetPagination,
        loadMoreTours, isLoadingMore } = useTours(idParam, typeParam)

    // Filters hook
    const { filters, setFilters, applyFilters, resetFilters } = useFilters({
        searchParams, router, resetPagination,
    })

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        try {
            const initialFilters = getFiltersFromSearchParams(searchParams);

            setFilters(initialFilters)
            loadTours(initialFilters)
        } catch (error) {
            console.error("Error loading tours with initial filters:", error);
        }
    }, [idParam, typeParam])

    // Load tours with applied filters
    const handleApplyFilters = async () => {
        try {
            applyFilters();
            await loadTours(filters, DEFAULT_PAGINATION);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    };

    // Load tours with default filters
    const handleResetFilters = async () => {
        try {
            resetFilters();
            await loadTours(DEFAULT_FILTERS, DEFAULT_PAGINATION);
        } catch (error) {
            console.error("Error resetting filters:", error);
        }
    }

    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Header */}
            <ResultsFilters name={name} isLoading={isLoading} totalResults={pagination.total}
                filters={filters} setFilters={setFilters} applyFilters={handleApplyFilters} resetFilters={handleResetFilters}
            />

            {/* Main Content */}
            <ResultsTabs paginationMeta={pagination} tourResults={tours} isLoading={isLoading} />

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() => loadMoreTours(filters)}
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
