"use client";

import { Button } from "@/recipes/button/button";
import { Filter, ChevronDown, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/recipes/popover/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/recipes/select/select";
import { paginationType, SortToursType, TourFiltersType } from "@/types/types";
import { Slider } from "@/recipes/slider/slider";
import { useState } from "react";

interface ResultsFiltersProps {
    name?: string;
    isLoading: boolean;
    pagination: paginationType;
    filters: TourFiltersType;
    setFilters: (filters: TourFiltersType) => void;
    applyFilters: () => void;
    resetFilters: () => void;
    handleSortTours?: (value: SortToursType) => void;
    sortBy: SortToursType;
}

const ResultsFilters = ({ name, isLoading, pagination, filters, setFilters, applyFilters,
    resetFilters, handleSortTours, sortBy
}
    : ResultsFiltersProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const accommodationTypes = [
        { displayName: "Mixed", name: "mixed" },
        { displayName: "Lodge", name: "lodge" },
        { displayName: "Camp", name: "camp" },];

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div className="mb-3 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {name ? `Search results for "${name}"` : "All Safari Options"}
                </h1>
                {(!isLoading && pagination.total > 0)
                    && (
                        <p className="text-lg text-gray-600">{pagination.total} results found</p>
                    )}
            </div>

            {/* Compact Modern Filter */}
            <div className="flex justify-between items-center space-x-4">
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
                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        resetFilters();
                                        setIsPopoverOpen(false);
                                    }}>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reset
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        applyFilters();
                                        setIsPopoverOpen(false);
                                    }}>
                                    <Filter className="mr-2 h-4 w-4" />
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Select disabled={isLoading} value={sortBy} onValueChange={(value: SortToursType) => handleSortTours && handleSortTours(value)}>
                    <SelectTrigger className="w-40 bg-white shadow-sm border-gray-200 rounded-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance" onClick={() => handleSortTours && handleSortTours("relevance")}>Relevance</SelectItem>
                        {/* <SelectItem value="price-low" >Price: Low to High</SelectItem> */}
                        {/* <SelectItem value="price-high">Price: High to Low</SelectItem> */}
                        {/* <SelectItem value="rating">Highest Rated</SelectItem> */}
                        <SelectItem value="duration" onClick={() => handleSortTours && handleSortTours("duration")}>Duration</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ResultsFilters;
