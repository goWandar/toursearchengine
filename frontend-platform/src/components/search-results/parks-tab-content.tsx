import { useEffect, useState } from "react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { Badge } from "@/recipes/badge/badge";
import { ParkSearchType } from "@/types/types";
import { getParksByCountry } from "@/utils/mordern-search.utils";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useToursStore } from "@/stores/useTourStore";

interface ParksTabContentProps {
    countryName: string;
}

const ParksTabContent = ({ countryName }: ParksTabContentProps) => {
    const [parks, setParks] = useState<ParkSearchType[]>([]);
    const [selectedPark, setSelectedPark] = useState<ParkSearchType | null>(null);

    // Zustand stores
    const { tours, pagination, isLoading, isLoadingMore, loadTours,
        resetPagination, loadMoreTours, setIsLoading, } = useToursStore();

    const { filters, sortBy } = useFiltersStore();

    // Get Parks Tabs by Country
    useEffect(() => {
        try {
            getParksByCountry(countryName, setParks);
        } catch (error) {
            console.error("Error fetching parks:", error);
        }
    }, [countryName]);

    // Load tours on mount and whenever selected park changes
    useEffect(() => {
        const loadToursForSelectedPark = async () => {
            if (!parks.length) return;

            try {
                const currentPark = selectedPark ?? parks[0];
                setSelectedPark(currentPark);

                resetPagination();

                await loadTours(currentPark.id, currentPark.type, filters, sortBy)
            } catch (error) {
                console.error("Error loading tours:", error)
            } finally {
                setIsLoading(false)
            };
        };
        loadToursForSelectedPark();
    }, [parks.length, selectedPark]);

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
