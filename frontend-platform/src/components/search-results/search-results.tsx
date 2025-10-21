"use client";
import { TourFiltersType, paginationType, Tour } from "@/types/types";
import { applyFiltersHelper, fetchTours } from "@/utils/mordern-search.utils";
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
    const idParam = Number(searchParams?.get("id"));
    const typeParam = (searchParams?.get("type")) ?? "";
    const accommodationParam = searchParams.get("acc");
    const durationParam = searchParams.get("dur");
    const budgetParam = searchParams.get("bud");
    const [paginationMeta, setPaginationMeta] = useState<paginationType>({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasMore: false,
    });
    const [filters, setFilters] = useState<TourFiltersType>({
        accommodation: [],
        budget: [100, 20000],
        duration: [1, 14],
    })
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all")
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Fetch tours on component mount or when id/type changes
    useEffect(() => {
        const tourFetcher = async () => {
            const acc = accommodationParam ? accommodationParam.split("|") : [];
            const dur = durationParam
                ? (durationParam.split("-").map(Number).slice(0, 2) as [number, number])
                : ([1, 14] as [number, number]);

            const bud = budgetParam
                ? (budgetParam.split("-").map(Number).slice(0, 2) as [number, number])
                : ([100, 20000] as [number, number]);

            const dynamicFIlter: TourFiltersType = { accommodation: acc, duration: dur, budget: bud }

            if (accommodationParam || durationParam) {
                setFilters({ accommodation: acc, duration: dur, budget: bud});
            }
            try {
                if (idParam && typeParam) {
                    setIsLoading(true);
                    await fetchTours(
                        idParam, typeParam, paginationMeta,
                        setTourResults, setPaginationMeta, false,
                        dynamicFIlter
                    );
                }
            } catch (error) {
                console.error("Error fetching tours:", error);
            } finally {
                setIsLoading(false);
            }
        };
        tourFetcher();
    }, [idParam, typeParam, durationParam, accommodationParam]);

    // Apply filters
    const applyFilters = async () => {
        try {
            setIsLoading(true);

            // Update URL with filters and reset pagination
            applyFiltersHelper(
                { filters, searchParams, router, setPaginationMeta, setTourResults }
            )

            // Fetch Filtered Tours
            await fetchTours(idParam, typeParam, paginationMeta, setTourResults,
                setPaginationMeta, false, filters);
        }
        catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load more tours
    const loadMore = async () => {
        try {
            if (!paginationMeta.hasMore) return;

            setIsLoadingMore(true);
            await fetchTours(idParam, typeParam, paginationMeta, setTourResults,
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
