"use client";
import React from 'react'
import { paginationType, Tour } from "@/types/types";
import { fetchTours } from "@/utils/mordern-search.utils";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from '@/recipes/button/button';
import { ChevronDown } from 'lucide-react';
import ResultsFilters from './results-filters';
import ResultsTabs from './results-tabs';

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
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
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all")
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        const tourFetcher = async () => {
            try {
                if (id && type) {
                    setIsLoading(true);
                    await fetchTours(
                        id, type, paginationMeta,
                        setTourResults, setPaginationMeta, false
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

    const loadMore = async () => {
        if (!paginationMeta.hasMore) return;

        setIsLoadingMore(true);
        await fetchTours(id, type, paginationMeta, setTourResults, setPaginationMeta, true);
        setIsLoadingMore(false);
    };
    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Header */}
            <ResultsFilters name={name} isLoading={isLoading} totalResults={paginationMeta.total} />

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
                        {isLoadingMore ? "Loading..." : "Load More"} <ChevronDown className="ml-2" />
                    </Button>
                )}
            </div>
        </div >


    )
};
