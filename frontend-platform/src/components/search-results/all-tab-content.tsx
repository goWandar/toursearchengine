import React, { useEffect } from 'react'
import SafariCardSkeleton from './safari-card-skeleton'
import ModernSafariCard from './modern-safari-card'
import { useTours } from '@/hooks/useTours'
import { useFilters } from '@/hooks/useFilters'
import { getQueriesFromSearchParams } from '@/utils/mordern-search.utils'
import { Button } from '@/recipes/button/button'
import { ChevronDown } from 'lucide-react'

interface AllTabContentProps {
    searchParams?: URLSearchParams;
    searchItemId: number;
    searchItemType: string;
    setTotalResults: (total: number) => void;
}

const AllTabContent = (
    {
        searchParams,
        searchItemId,
        searchItemType,
        setTotalResults,
    }: AllTabContentProps
) => {

    // Tours hook
    const { tours, pagination, isLoading,
        loadTours, resetPagination,
        loadMoreTours, isLoadingMore } = useTours(searchItemId, searchItemType);

    // Filters Hook
    const { filters, setFilters, setSortBy, sortBy } = useFilters();

    // Load tours with initial filters from URL on mount
    useEffect(() => {
        const loadInitialTours = async () => {
            try {
                if (!searchParams) return;
                const { initialFilters, initialSorting } = getQueriesFromSearchParams(searchParams);
                setFilters(initialFilters)
                setSortBy(initialSorting);
                loadTours(initialFilters, initialSorting, setTotalResults);
            } catch (error) {
                console.error("Error loading tours with initial filters:", error);
            }
        };
        loadInitialTours();
    }, [searchItemId, searchItemType])

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
            <div id="insights-section">
                {/* <InsightsSection type="parks" subType="general" /> */}
            </div>
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
        </>
    )
}

export default AllTabContent