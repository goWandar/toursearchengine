"use client";

import React, { useEffect } from "react";
import SafariCardSkeleton from "./safari-card-skeleton";
import ModernSafariCard from "./modern-safari-card";
import { getFilterQueriesFromSearchParams } from "@/utils/mordern-search.utils";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useToursStore } from "@/stores/useTourStore";

interface AllTabContentProps {
    searchParams: URLSearchParams;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
}

const AllTabContent = ({
    searchParams,
    setSearchItemType,
    setSearchItemId,
}: AllTabContentProps) => {
    const idInURL = Number(searchParams?.get("id")) || 0;
    const typeInURL = searchParams?.get("type") ?? "";

    // Tours Store
    const { tours, pagination, isLoading, isLoadingMore, loadTours,
        loadMoreTours, resetPagination } = useToursStore();

    // Filters Store
    const { filters, setFilters, sortBy, setSortBy, setIsFiltersApplied } = useFiltersStore();

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        const loadInitialTours = async () => {
            if (!searchParams) return;

            // Get initial search item from URL
            const currentSearchItemId = idInURL;
            const currentSearchItemType = typeInURL;

            // Set search item in parent component(for filtering handlers) 
            setSearchItemType(currentSearchItemType);
            setSearchItemId(currentSearchItemId);

            // Fetch initial filters and sorting from URL
            const { initialFilters, initialSorting } =
                getFilterQueriesFromSearchParams(searchParams, setIsFiltersApplied);

            setFilters(initialFilters);
            setSortBy(initialSorting);

            resetPagination();

            // Load tours with initial filters and sorting
            await loadTours(currentSearchItemId, currentSearchItemType, initialFilters, initialSorting);
        };

        loadInitialTours();
    }, [idInURL, typeInURL, setSearchItemId, setSearchItemType]);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 12 }).map((_, i) => (
                        <SafariCardSkeleton key={i} />
                    ))
                    : tours.map((tour, idx) => (
                        <ModernSafariCard key={idx} data={tour} showCarousel={true} />
                    ))}
            </div>

            {/* Insights Section (placeholder) */}
            <div id="insights-section">{/* <InsightsSection /> */}</div>

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() => loadMoreTours(idInURL, typeInURL, filters, sortBy)}
                        className="flex items-center"
                        loading={isLoadingMore}
                        disabled={isLoadingMore}
                    >
                        {!isLoadingMore && <ChevronDown className="mr-2" />}
                        {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                )}
            </div>
        </>
    );
};

export default AllTabContent;
