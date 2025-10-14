"use client";

import { Button } from "@/recipes/button/button";
import { Filter, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/recipes/popover/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/recipes/select/select";

interface ResultsFiltersProps {
    name?: string;
    isLoading: boolean;
    totalResults: number;
}

const ResultsFilters = ({ name, isLoading, totalResults }: ResultsFiltersProps) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    {name ? `Search results for "${name}"` : "All Safari Options"}
                </h1>
                {!isLoading && (
                    <p className="text-lg text-gray-600">{totalResults} results found</p>
                )}
            </div>

            {/* Compact Modern Filter */}
            <div className="flex items-center space-x-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center space-x-2 bg-white shadow-sm border-gray-200 hover:bg-gray-50 rounded-full px-6"
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filters</span>
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-6" align="end">
                        <div className="space-y-6">
                            <h3 className="font-semibold text-lg">Refine Results</h3>

                            {/* Budget Filter */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">
                                    Budget (USD/day)
                                </h4>
                                {/* slider here later */}
                            </div>

                            {/* Duration Filter */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">
                                    Duration (days)
                                </h4>
                                {/* slider here later */}
                            </div>

                            {/* Accommodation Filter */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">
                                    Accommodation Type
                                </h4>
                                {/* checkboxes here later */}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Select defaultValue="relevance">
                    <SelectTrigger className="w-40 bg-white shadow-sm border-gray-200 rounded-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ResultsFilters;
