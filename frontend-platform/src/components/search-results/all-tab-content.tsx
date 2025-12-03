"use client";

import { useEffect } from "react";
import SafariCardSkeleton from "./safari-card-skeleton";
import ModernSafariCard from "./modern-safari-card";
import { loadInitialTours } from "@/utils/free-search.utils";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { useToursStore } from "@/stores/useTourStore";
import { useRouter } from "next/navigation";
import { ActiveTabType } from "@/types/free-search.types";

interface AllTabContentProps {
    searchParams: URLSearchParams;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    idInURL: number;
    typeInURL: string;
    activeTab: ActiveTabType;
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
    const isLoadingMore = useToursStore((state) => state.isLoadingMore);
    const loadMoreTours = useToursStore((state) => state.loadMoreTours);
    const resultsState = useToursStore((state) => state.resultsState);

    // Filters Store state and actions
    const filters = useFiltersStore((state) => state.filters);
    const sortBy = useFiltersStore((state) => state.sortBy);
    const pricedBy = useFiltersStore((state) => state.pricedBy);

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        loadInitialTours({
            idInURL,
            typeInURL,
            activeTab,
            searchParams,
            router,
            setSearchItemType,
            setSearchItemId,
        });
    }, [idInURL, typeInURL]);

    return (
        <>
            {/* Tour Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {resultsState === "loading" && Array.from({ length: 12 }).map((_, i) => <SafariCardSkeleton key={i} />)}

                {resultsState === "returned" && tours.map((tour, idx) => <ModernSafariCard key={idx} data={tour} showCarousel />)}
            </div>
            <div className="flex justify-center text-lg font-bold">
                {resultsState === "void" && <p className="text-gray-500">No Tours found for your selection</p>}
                {resultsState === "error" && <p className="text-red-300">An unexpected error occured. Please try refreshing this page</p>}
            </div>

            {/* Insights Section (placeholder) */}
            <div id="insights-section">{/* <InsightsSection /> */}</div>

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() => loadMoreTours(idInURL, typeInURL, filters, sortBy, pricedBy)}
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
