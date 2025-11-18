"use client";

import React, { useEffect } from "react";
import SafariCardSkeleton from "./safari-card-skeleton";
import ModernSafariCard from "./modern-safari-card";
import { loadInitialTours, tourSearchUrlHandler } from "@/utils/mordern-search.utils";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useToursStore } from "@/stores/useTourStore";
import { useRouter } from "next/navigation";

interface AllTabContentProps {
    searchParams: URLSearchParams;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    idInURL: number;
    typeInURL: string;
    activeTab: "all" | "parks" | "experiences";
}

const AllTabContent = ({
    searchParams,
    setSearchItemType,
    setSearchItemId,
    idInURL,
    typeInURL,
    activeTab,
}: AllTabContentProps) => {
    const router = useRouter();

    // Tours Store state and actions
    const tours = useToursStore((state) => state.tours);
    const pagination = useToursStore((state) => state.pagination);
    const isLoading = useToursStore((state) => state.isLoading);
    const isLoadingMore = useToursStore((state) => state.isLoadingMore);
    const loadTours = useToursStore((state) => state.loadTours);
    const loadMoreTours = useToursStore((state) => state.loadMoreTours);
    const resetPagination = useToursStore((state) => state.resetPagination);
    const setIsLoading = useToursStore((state) => state.setIsLoading);

    // Filters Store state and actions
    const filters = useFiltersStore((state) => state.filters);
    const sortBy = useFiltersStore((state) => state.sortBy);
    const setFilters = useFiltersStore((state) => state.setFilters);
    const setSortBy = useFiltersStore((state) => state.setSortBy);
    const setAppliedFilters = useFiltersStore((state) => state.setAppliedFilters);

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        loadInitialTours({
            idInURL,
            typeInURL,
            activeTab,
            searchParams,
            router,
            setIsLoading,
            setSearchItemType,
            setSearchItemId,
            setAppliedFilters,
            setFilters,
            setSortBy,
            resetPagination,
            loadTours,
            tourSearchUrlHandler
        });
    }, [idInURL, typeInURL]);

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
