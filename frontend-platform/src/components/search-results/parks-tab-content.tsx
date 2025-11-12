import { useEffect, useState } from "react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { Badge } from "@/recipes/badge/badge";
import { ParkSearchType } from "@/types/types";
import { getFilterQueriesFromSearchParams, getParksByCountry } from "@/utils/mordern-search.utils";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useToursStore } from "@/stores/useTourStore";

interface ParksTabContentProps {
    searchParams: URLSearchParams;
    countryName: string;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    tabFromUrl: string | null;
}

const ParksTabContent = ({ searchParams, countryName, setSearchItemType, setSearchItemId,
    tabFromUrl,
}: ParksTabContentProps) => {
    const [parks, setParks] = useState<ParkSearchType[]>([]);
    const [selectedPark, setSelectedPark] = useState<ParkSearchType | null>(null);

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
    const setIsFiltersApplied = useFiltersStore((state) => state.setIsFiltersApplied);

    // Get Parks by Country Name
    useEffect(() => {
        setIsLoading(true);
        if (!tabFromUrl || tabFromUrl !== "parks") return;

        console.log("***************Tab From URL*************: ", tabFromUrl)

        try {
            // Implement logic for when countryName is missing*** 

            getParksByCountry(countryName, setParks);
        } catch (error) {
            console.error("Error fetching parks:", error);
        }
    }, [countryName, searchParams, tabFromUrl]);

    useEffect(() => {
        if (!parks.length) return;

        // Set either the first park or selected park as current
        setSelectedPark(selectedPark ?? parks[1]);
    }, [parks]);

    // Load tours on mount or whenever selected park changes
    useEffect(() => {
        const loadToursForSelectedPark = async () => {
            if (!selectedPark) return;

            try {

                // Set search item in parent component(for filtering handlers)
                setSearchItemType(selectedPark.type);
                setSearchItemId(selectedPark.id);

                // Fetch initial filters and sorting from URL
                const { filtersFromURL, sortingFromURL } =
                    getFilterQueriesFromSearchParams(searchParams, setIsFiltersApplied);

                setFilters(filtersFromURL);
                setSortBy(sortingFromURL);

                resetPagination();

                // Load tours based on Selected Park
                await loadTours(selectedPark.id, selectedPark.type, filtersFromURL, sortingFromURL)
            } catch (error) {
                console.error("Error loading tours:", error)
            } finally {
                setIsLoading(false)
            };
        };
        loadToursForSelectedPark();
    }, [selectedPark]);

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex flex-wrap gap-3">
                    {parks.map((park, idx) => {
                        const isSelected = selectedPark?.id === park.id;

                        return (
                            <Badge
                                key={idx}
                                onClick={() => setSelectedPark(park)}
                                variant="secondary"
                                className={`
                  cursor-pointer transition-colors rounded-full px-4 py-2
                  ${isSelected
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                                    }
                `}
                            >
                                {park.name}
                            </Badge>
                        );
                    })}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 12 }).map((_, i) => <SafariCardSkeleton key={i} />)
                    : tours.map((tour, idx) => <ModernSafariCard key={idx} data={tour} showCarousel />)}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() =>
                            loadMoreTours(selectedPark?.id ?? 0, selectedPark?.type ?? "", filters, sortBy)
                        }
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

export default ParksTabContent;
