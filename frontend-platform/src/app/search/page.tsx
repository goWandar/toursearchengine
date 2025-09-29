"use client";

import { paginationType, Tour } from "@/types/types";
import { fetchTours } from "@/utils/mordern-search.utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const SearchPage = () => {
    const searchParams = useSearchParams();
    const [tourResults, setTourResults] = useState<Tour[]>([]);
    const [paginationMeta, setPaginationMeta] = useState<paginationType>({
        page: 1,
        limit: 16,
        total: 0,
        totalPages: 0,
        hasMore: false,
    });


    const id = searchParams?.get("id");
    const type = searchParams?.get("type");

    useEffect(() => {
        if (id && type) {
            fetchTours(
                Number(id), String(type), paginationMeta,
                setTourResults, setPaginationMeta
            );
        }
    }, [id, type]);

    return <div>
        {/* Render cards with tour data */}
        {tourResults.map((tour) => (
            <div key={tour.id} className="border p-4 mb-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-2">{tour.title}</h2>
                <p className="text-gray-600 mb-2">{tour.description}</p>
                <p className="text-sm text-gray-500">Operator: {tour.operator.name}</p>
                <div className="mt-2">
                    <h3 className="font-semibold">Prices:</h3>
                    <ul className="list-disc list-inside">
                        {/* {tour.prices.map((price) => (
                            <li key={price.id}>
                                {price.numOfPeople} people - {price.currency} {price.pricePerPerson} per person
                                {price.seasonName ? ` (${price.seasonName})` : ''}
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>
        ))}
    </div>;
};

export default SearchPage;
