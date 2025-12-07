import { useEffect, useState } from "react";
import { useFiltersStore } from "@/stores/useFiltersStore";
import { Badge } from "@/recipes/badge/badge";
import { getExperiences, loadToursForSelectedExperience } from "@/utils/free-search.utils";
import ModernSafariCard from "./modern-safari-card";
import SafariCardSkeleton from "./safari-card-skeleton";
import { Button } from "@/recipes/button/button";
import { ChevronDown } from "lucide-react";
import { useToursStore } from "@/stores/useTourStore";
import { useRouter } from "next/navigation";
import { ActiveTabType, ExperienceType } from "@/types/free-search.types";


interface ExperiencesTabContentProps {
    searchParams: URLSearchParams;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
    tabFromUrl: string | null;
    destinationTypeInUrl: string;
    destinationIdInUrl: number;
    experienceIdInUrl: number;
    activeTab: ActiveTabType;
}

const ExperiencesTabContent = ({ activeTab, searchParams, setSearchItemType, setSearchItemId,
    destinationTypeInUrl, destinationIdInUrl, experienceIdInUrl
}: ExperiencesTabContentProps) => {
    const router = useRouter();
    const [experiences, setExperiences] = useState<ExperienceType[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<ExperienceType | null>(null);

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
        const fetchExperiences = async () => {
            setResultsState("loading");

            try {
                const experiences = await getExperiences();
                setExperiences(experiences);

                // Set selected experience immediately
                const experienceFromUrl = experiences.find(experience => experience.id === experienceIdInUrl);
                setSelectedExperience(experienceFromUrl || experiences[0]);

            } catch (error) {
                setResultsState("error")
                console.error("Error loading experiences");
            }
        };

        fetchExperiences();
    }, []);

    // Load tours on mount or whenever selected experience changes
    useEffect(() => {
        if (!selectedExperience || !destinationIdInUrl || !destinationTypeInUrl) return;
        loadToursForSelectedExperience({
            selectedExperience, activeTab, searchParams,
            router, setSearchItemType, setSearchItemId,
            experienceDestination: { destinationId: destinationIdInUrl, destinationType: destinationTypeInUrl }
        });
    }, [selectedExperience, destinationIdInUrl, destinationTypeInUrl]);

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex flex-wrap gap-3">
                    {experiences.map((experience, idx) => {
                        const isSelected = selectedExperience?.id === experience.id;

                        return (
                            <Badge
                                key={idx}
                                onClick={() => setSelectedExperience(experience)}
                                variant="secondary"
                                className={`
                  cursor-pointer transition-colors rounded-full md:px-4 md:py-2
                  ${isSelected
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                                    }
                `}
                            >
                                {experience.name}
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
                            loadMoreTours(selectedExperience?.id ?? 0, "experience", filters, sortBy, pricedBy)
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

export default ExperiencesTabContent;
