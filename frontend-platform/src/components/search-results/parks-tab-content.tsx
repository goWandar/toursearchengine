import { useEffect, useState } from "react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { Badge } from "@/recipes/badge/badge";
import { getParksByCountry, loadToursForSelectedPark } from "@/utils/free-search.utils";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useToursStore } from "@/stores/useTourStore";
import { useRouter } from "next/navigation";
import { ActiveTabType, ParkSearchType } from "@/types/free-search.types";


interface ParksTabContentProps {
    searchParams: URLSearchParams;
    countryName: string;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    tabFromUrl: string | null;
    parkIdInUrl: number;
    activeTab: ActiveTabType;
}

const ParksTabContent = ({ activeTab, searchParams, countryName, setSearchItemType, setSearchItemId,
    parkIdInUrl
}: ParksTabContentProps) => {
    const router = useRouter();
    const [parks, setParks] = useState<ParkSearchType[]>([]);
    const [selectedPark, setSelectedPark] = useState<ParkSearchType | null>(null);

    // Tours Store state and actions
    const tours = useToursStore((state) => state.tours);
    const pagination = useToursStore((state) => state.pagination);
    const isLoadingMore = useToursStore((state) => state.isLoadingMore);
    const loadMoreTours = useToursStore((state) => state.loadMoreTours);
    const resultsState = useToursStore((state) => state.resultsState);
    const setResultsState = useToursStore((state) => state.setResultsState);

    // Filters Store state and actions
    const filters = useFiltersStore((state) => state.filters);
    const sortBy = useFiltersStore((state) => state.sortBy);
    const pricedBy = useFiltersStore((state) => state.pricedBy);

    useEffect(() => {
        if (!countryName) return;

        const fetchParks = async () => {
            setResultsState("loading");

            try {
                const parks = await getParksByCountry(countryName);
                setParks(parks);

                // Set selected park immediately
                const parkFromURL = parks.find(park => park.id === parkIdInUrl);
                setSelectedPark(parkFromURL || parks[0]);

            } catch (error) {
                setResultsState("error")
                console.error("Error loading parks");
            }
        };

        fetchParks();
    }, [countryName]);

    // Load tours on mount or whenever selected park changes
    useEffect(() => {
        loadToursForSelectedPark({
            selectedPark, activeTab, searchParams,
            router, setSearchItemType, setSearchItemId,
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
                {resultsState === "loading" && Array.from({ length: 12 }).map((_, i) => <SafariCardSkeleton key={i} />)}

                {resultsState === "returned" && tours.map((tour, idx) => <ModernSafariCard key={idx} data={tour} showCarousel />)}
            </div>
            <div className="flex justify-center text-lg font-bold">
                {resultsState === "void" && <p className="text-gray-300">No tours found that match your selection</p>}
                {resultsState === "error" && <p className="text-red-300">An unexpected error occured. Please try refreshing this page</p>}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
                {pagination.hasMore && (
                    <Button
                        onClick={() =>
                            loadMoreTours(selectedPark?.id ?? 0, selectedPark?.type ?? "", filters, sortBy, pricedBy)
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
