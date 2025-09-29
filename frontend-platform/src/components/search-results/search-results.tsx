"use client";
import React from 'react'
import { paginationType, Tour } from "@/types/types";
import { fetchTours } from "@/utils/mordern-search.utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ModernSafariCard from './modern-safari-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/recipes/popover/popover';
import { Button } from '@/recipes/button/button';
import { ChevronDown, Filter, Lightbulb } from 'lucide-react';
import { Slider } from '@/recipes/slider/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/recipes/select/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/recipes/tabs/tabs';

export const SearchResults = () => {
    const searchParams = useSearchParams();
    const [tourResults, setTourResults] = useState<Tour[]>([]);
    const id = searchParams?.get("id");
    const type = searchParams?.get("type");
    const [paginationMeta, setPaginationMeta] = useState<paginationType>({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasMore: false,
    });
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        if (id && type) {
            fetchTours(
                Number(id), String(type), paginationMeta,
                setTourResults, setPaginationMeta
            );
        }
    }, [id, type]);
    return (
        <div className='container mx-auto px-6 py-12'>
            {/* Search Results Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        {/* {query ? `Search results for "${query}"` : "All Safari Options"} */}
                    </h1>
                    <p className="text-lg text-gray-600">{paginationMeta.total} results found</p>
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
                                    <h4 className="font-medium text-sm text-gray-700">Budget (USD/day)</h4>
                                    {/* <Slider
                                        value={filters.budget}
                                        onValueChange={(value) => setFilters({ ...filters, budget: value })}
                                        max={1500}
                                        min={100}
                                        step={50}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>${filters.budget[0]}</span>
                                        <span>${filters.budget[1]}</span>
                                    </div> */}
                                </div>

                                {/* Duration Filter */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm text-gray-700">Duration (days)</h4>
                                    {/* <Slider
                                        value={filters.duration}
                                        onValueChange={(value) => setFilters({ ...filters, duration: value })}
                                        max={14}
                                        min={1}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{filters.duration[0]} days</span>
                                        <span>{filters.duration[1]} days</span>
                                    </div> */}
                                </div>

                                {/* Accommodation Filter */}
                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm text-gray-700">Accommodation Type</h4>
                                    {/* <div className="space-y-2">
                                        {accommodationTypes.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={type}
                                                    checked={filters.accommodation.includes(type)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFilters({ ...filters, accommodation: [...filters.accommodation, type] })
                                                        } else {
                                                            setFilters({
                                                                ...filters,
                                                                accommodation: filters.accommodation.filter((a) => a !== type),
                                                            })
                                                        }
                                                    }}
                                                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                                                />
                                                <label htmlFor={type} className="text-sm cursor-pointer">
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div> */}
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

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative">
                    <TabsTrigger value="all" asChild>
                        <div className="rounded-xl font-medium relative">
                            All Results ({paginationMeta.total})
                            {activeTab === "all" && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                    title="View helpful insights"
                                >
                                    <Lightbulb className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </TabsTrigger>

                    {/* Repeat for other tabs */}
                    <TabsTrigger value="someTab" asChild>
                        <div className="rounded-xl font-medium relative">Some Tab</div>
                    </TabsTrigger>
                    {/* <TabsTrigger value="parks" className="rounded-xl font-medium relative">
                        Parks ({getTabResults("parks").length})
                        {activeTab === "parks" && (
                            <Button
                                onClick={scrollToInsights}
                                size="sm"
                                variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                title="View park insights"
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </TabsTrigger> */}
                    {/* <TabsTrigger value="experiences" className="rounded-xl font-medium relative">
                        Experiences ({getTabResults("experiences").length})
                        {activeTab === "experiences" && (
                            <Button
                                onClick={scrollToInsights}
                                size="sm"
                                variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full shadow-sm"
                                title="View experience insights"
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </TabsTrigger> */}
                </TabsList>

                <TabsContent value="all" className="space-y-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {tourResults.map((tour) => (
                            <ModernSafariCard key={tour.id} data={tour} />
                        ))}
                    </div>
                    <div id="insights-section">
                        {/* <InsightsSection type="parks" subType="general" /> */}
                    </div>
                </TabsContent>

                {/* <TabsContent value="parks" className="space-y-12">
                    {searchedCountry && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border">
                            <div className="flex flex-wrap gap-2">
                                {parksByCountry[searchedCountry as keyof typeof parksByCountry]?.map((park) => (
                                    <Badge
                                        key={park}
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-teal-100 hover:text-teal-700 transition-colors bg-gray-100 text-gray-700 rounded-full px-4 py-2"
                                    >
                                        {park}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                    )} 
                </TabsContent> */}
            </Tabs>
        </div >


    )
};
