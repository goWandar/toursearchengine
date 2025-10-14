"use client";
import { TourFiltersType, paginationType, Tour } from "@/types/types";
import { fetchTours } from "@/utils/mordern-search.utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@/recipes/button/button';
import { ChevronDown } from 'lucide-react';
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [tourResults, setTourResults] = useState<Tour[]>([]);
    const name = decodeURIComponent(params.name as string);
    const id = Number(searchParams?.get("id"));
    const type = (searchParams?.get("type")) ?? "";
    const [paginationMeta, setPaginationMeta] = useState<paginationType>({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasMore: false,
    });
    const [filters, setFilters] = useState<TourFiltersType>({
        accommodation: [],
        duration: [1, 14],
    })
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all")
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);

    // Fetch tours on component mount or when id/type changes
    useEffect(() => {
        const tourFetcher = async () => {
            try {
                if (id && type) {
                    setIsLoading(true);
                    await fetchTours(
                        id, type, paginationMeta,
                        setTourResults, setPaginationMeta, false,
                        filters
                    );
                }
            } catch (error) {
                console.error("Error fetching tours:", error);
            } finally {
                setIsLoading(false);
            }
        };
        tourFetcher();
    }, [id, type]);

    const applyFilters = async () => {
        try {
            console.log("Applying Filters:", filters);
            const params = new URLSearchParams(searchParams.toString());

            // Accommodation
            if (filters.accommodation.length > 0) {
                params.set("acc", filters.accommodation.join("|"));
            } else {
                params.delete("acc");
            }

            // Duration
            const [minDur, maxDur] = filters.duration;
            if (!(minDur === 1 && maxDur === 14)) {
                params.set("dur", `${minDur}-${maxDur}`);
            } else {
                params.delete("dur");
            }

            // Update the URL without refreshing
            router.replace(`?${params.toString()}`);

            await fetchTours(id, type, paginationMeta, setTourResults,
                setPaginationMeta, true, filters);
        }
        catch (error) {
            console.error("Error applying filters:", error);
        }
    };

    // Load more tours
    const loadMore = async () => {
        try {
            if (!paginationMeta.hasMore) return;

            setIsLoadingMore(true);
            await fetchTours(id, type, paginationMeta, setTourResults,
                setPaginationMeta, true, filters);
        } catch (error) {
            console.error("Error loading more tours:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };
    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Header */}
            <ResultsFilters name={name} isLoading={isLoading} totalResults={paginationMeta.total}
                filters={filters} setFilters={setFilters} applyFilters={applyFilters}
            />

            {/* Main Content */}
            <ResultsTabs paginationMeta={paginationMeta} tourResults={tourResults} isLoading={isLoading} />

            {/* Load More Button */}
            <div className="flex justify-center">
                {paginationMeta.hasMore && (
                    <Button
                        onClick={loadMore}
                        className="flex items-center"
                        loading={isLoadingMore}
                        disabled={isLoadingMore}
                    >
                        {!isLoadingMore && <ChevronDown className="mr-2" />}
                        {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                )}
            </div>
        </div >


    )
};
