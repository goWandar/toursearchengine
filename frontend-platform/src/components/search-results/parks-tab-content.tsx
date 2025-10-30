import { useFilters } from "@/hooks/useFilters";
import { useTours } from "@/hooks/useTours";
import { Badge } from "@/recipes/badge/badge";
import { ParkSearchType } from "@/types/types";
import { getParksByCountry } from "@/utils/mordern-search.utils";
import { useEffect, useState } from "react";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";

interface ParksTabContentProps {
    countryName: string;
    setTotalResults: (total: number) => void;
};

const ParksTabContent = ({ countryName, setTotalResults }: ParksTabContentProps) => {
    const [parks, setParks] = useState<ParkSearchType[]>([]);
    const [selectedPark, setSelectedPark] = useState<ParkSearchType | null>(null);

    // Tours hook
    const {
        tours,
        pagination,
        isLoading,
        loadTours,
        resetPagination,
        loadMoreTours,
        isLoadingMore
    } = useTours(selectedPark?.id ?? 0, selectedPark?.type ?? "");

    const { filters, setFilters, sortBy, setSortBy } = useFilters();

    // Get Parks Tabs by Country
    useEffect(() => {
        try {
            getParksByCountry(countryName, setParks);
        } catch (error) {
            console.error("Error fetching parks:", error);
        }
    }, [countryName]);



    useEffect(() => {
        if (parks.length > 0) {
            setSelectedPark(parks[0]);

            resetPagination();

            // Load tours for the first park by default
            loadTours(filters, sortBy, setTotalResults);
        }
    }, [parks.length, selectedPark]);


    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex flex-wrap gap-3">
                    {parks && parks.map((park, idx) => {
                        const isSelected = selectedPark?.id === park.id;

                        return (
                            <Badge
                                key={idx}
                                onClick={() => {
                                    setSelectedPark(park);
                                    resetPagination();
                                    loadTours(filters, sortBy, setTotalResults);
                                }}
                                variant="secondary"
                                className={`
        cursor-pointer transition-colors rounded-full px-4 py-2
        ${isSelected
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"}
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
                    ? Array.from({ length: 12 }).map((_, i) => (
                        <SafariCardSkeleton key={i} />
                    ))
                    : tours.map((tour, idx) => (
                        <ModernSafariCard key={idx} data={tour} showCarousel={true} />
                    ))}
            </div>
            {/*
        <div id="insights-section">
            <InsightsSection type="experiences" subType="general" />
        </div> */}
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

export default ParksTabContent