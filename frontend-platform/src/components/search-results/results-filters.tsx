"use client";

import { Button } from "@/recipes/button/button";
import { Filter, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/recipes/popover/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/recipes/select/select";
import { TourFiltersType } from "@/types/types";
import { Slider } from "@/recipes/slider/slider";
import { useState } from "react";

interface ResultsFiltersProps {
    name?: string;
    isLoading: boolean;
    totalResults: number;
    filters: TourFiltersType;
    setFilters: React.Dispatch<React.SetStateAction<TourFiltersType>>;
    applyFilters: () => void;
}

const ResultsFilters = ({ name, isLoading, totalResults, filters, setFilters, applyFilters }
    : ResultsFiltersProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const accommodationTypes = [
        { displayName: "Mixed", name: "mixed" },
        { displayName: "Lodge", name: "lodge" },
        { displayName: "Camp", name: "camp" },];

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
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            disabled={isLoading}
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
                                <h4 className="font-medium text-sm text-gray-700">Budget (USD/person)</h4>
                                <Slider
                                    value={filters.budget}
                                    onValueChange={(value) => setFilters({ ...filters, budget: [value[0], value[1]] })}
                                    max={20000}
                                    min={100}
                                    step={100}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>${filters.budget[0]}</span>
                                    <span>${filters.budget[1]}</span>
                                </div>
                            </div>

                            {/* Duration Filter */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">
                                    Duration (days)
                                </h4>
                                <Slider
                                    value={filters.duration}
                                    onValueChange={(value) => setFilters({ ...filters, duration: [value[0], value[1]] })}
                                    max={14}
                                    min={1}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{filters.duration[0]} days</span>
                                    <span>{filters.duration[1]} days</span>
                                </div>
                            </div>

                            {/* Accommodation Filter */}
                            <div className="space-y-3">
                                <h4 className="font-medium text-sm text-gray-700">
                                    Accommodation Type
                                </h4>
                                <div className="space-y-2">
                                    {accommodationTypes.map((type) => (
                                        <div key={type.displayName} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id={type.displayName}
                                                checked={filters.accommodation.includes(type.name)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters({ ...filters, accommodation: [...filters.accommodation, type.name] })
                                                    } else {
                                                        setFilters({
                                                            ...filters,
                                                            accommodation: filters.accommodation.filter((a) => a !== type.name),
                                                        })
                                                    }
                                                }}
                                                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                            />
                                            <label htmlFor={type.displayName} className="text-sm cursor-pointer">
                                                {type.displayName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Button onClick={() => {
                                    applyFilters();
                                    setIsPopoverOpen(false);
                                }}>
                                    Apply Filters
                                </Button>
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
