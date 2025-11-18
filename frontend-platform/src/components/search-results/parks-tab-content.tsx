import { useEffect, useState } from "react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { Badge } from "@/recipes/badge/badge";
import { ActiveTabType, ParkSearchType } from "@/types/types";
import { tourSearchUrlHandler, getParksByCountry, loadToursForSelectedPark } from "@/utils/mordern-search.utils";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useToursStore } from "@/stores/useTourStore";
import { useRouter } from "next/navigation";


interface ParksTabContentProps {
    searchParams: URLSearchParams;
    countryName: string;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    tabFromUrl: string | null;
    parkIdFromURL: number;
    activeTab: ActiveTabType;
}

const ParksTabContent = ({ activeTab, searchParams, countryName, setSearchItemType, setSearchItemId,
    parkIdFromURL
}: ParksTabContentProps) => {
    const router = useRouter();
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
    const setAppliedFilters = useFiltersStore((state) => state.setAppliedFilters);

    // Get Parks by Country Name
    useEffect(() => {
        setIsLoading(true);

        // Implement logic for when countryName is missing***
        if (!countryName) return;
        try {
            getParksByCountry(countryName, setParks);
        } catch (error) {
            console.error("Error fetching parks:", error);
        }
    }, [countryName]);

    // Set selected park when parks are loaded or parkIdFromURL changes
    useEffect(() => {
        if (!parks.length) return;
        // Set selected park based on URL or default to first park
        const parkFromURL = parks.find((park) => park.id === parkIdFromURL);
        if (parkFromURL) {
            setSelectedPark(parkFromURL);
        } else {
            setSelectedPark(parks[0]);
        }

    }, [parks]);

    // Load tours on mount or whenever selected park changes
    useEffect(() => {
        loadToursForSelectedPark({
            selectedPark, activeTab, searchParams,
            router, setSearchItemType, setSearchItemId,
            setAppliedFilters, setFilters, setSortBy,
            resetPagination, loadTours, setIsLoading
        });
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
                  cursor-pointer transition-colors rounded-full md:px-4 md:py-2
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

            {/* Tour Results */}
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
