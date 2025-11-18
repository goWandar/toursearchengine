"use client";
import { useParams, useSearchParams } from "next/navigation";
import ResultsTabs from './results-tabs';
import { useState } from "react";
import ResultsHeader from "./results-header";

export const SearchResults = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const name = decodeURIComponent(params.name as string);
    const idFromURL = Number(searchParams?.get("id")) || 0;
    const typeFromURL = searchParams?.get("type") ?? "";
    // Search Item ID and Type State
    const [searchItemId, setSearchItemId] = useState<number>(idFromURL);
    const [searchItemType, setSearchItemType] = useState<string>(typeFromURL);

    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Filters - Header */}
            <ResultsHeader name={name} searchParams={searchParams}
                searchItemId={searchItemId} searchItemType={searchItemType}
            />

            {/* Search Results Content */}
            <ResultsTabs searchItemName={name} searchParams={searchParams}
                setSearchItemType={setSearchItemType} setSearchItemId={setSearchItemId}
            />
        </div >
    )
};
