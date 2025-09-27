'use client';

import { MapPin, Palmtree, Globe2Icon, TrendingUp } from 'lucide-react';
import {
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
    Command,
} from '@/recipes/command/command';
import { SuggestionType } from '@/types/types';
import { Skeleton } from '@/recipes/skeleton/skeleton';

interface SearchSuggestionsProps {
    isLoading: boolean;
    filteredSuggestions: SuggestionType[];
    searchValue: string;
    popularParks: { name: string; country: string }[];
    trendingDestinations: string[];
    handleDestinationSelect: (type: string, id: number) => void;
}

export function SearchSuggestions({
    isLoading,
    filteredSuggestions,
    searchValue,
    popularParks,
    trendingDestinations,
    handleDestinationSelect,
}: SearchSuggestionsProps) {
    return (
        <Command className="rounded-md border-0">
            <CommandList className="max-h-[400px] overflow-y-auto overflow-x-hidden">
                {isLoading ? (
                    // Skeleton Loaders
                    <>
                        {/* Popular Parks Skeleton */}
                        <CommandGroup>
                            <div className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-100">
                                <Skeleton className="h-4 w-24" />
                            </div>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <CommandItem
                                    key={idx}
                                    className="cursor-default flex flex-col items-start px-4 py-3"
                                >
                                    <Skeleton className="h-4 w-32 mb-2" />
                                    <Skeleton className="h-3 w-24" />
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        {/* Trending Searches Skeleton */}
                        <CommandGroup>
                            <div className="flex items-center gap-2 px-2 py-1.5 border-b border-gray-100 mb-2">
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="px-2 pb-2">
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <Skeleton key={idx} className="h-7 w-24 rounded-full" />
                                    ))}
                                </div>
                            </div>
                        </CommandGroup>
                    </>
                ) : filteredSuggestions.length > 0 ? (
                    // Search Suggestions
                    <>
                        <CommandGroup>
                            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700 border-b border-gray-100">
                                <MapPin className="h-4 w-4 text-teal-600" />
                                Parks & Countries
                            </div>
                            {filteredSuggestions.map((suggestion, idx) => (
                                <CommandItem
                                    key={idx}
                                    onSelect={() =>
                                        handleDestinationSelect(suggestion.type, suggestion.id)
                                    }
                                    className="cursor-pointer flex flex-col items-start px-4 py-3"
                                >
                                    <div className="flex items-center font-medium text-gray-900">
                                        {suggestion.type === 'park' ? (
                                            <Palmtree className="h-4 w-4 text-gray-400 mr-2" />
                                        ) : (
                                            <Globe2Icon className="h-4 w-4 text-gray-400 mr-2" />
                                        )}
                                        {suggestion.name}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </>
                ) : searchValue ? (
                    // No Results Found
                    <CommandEmpty>No destinations found.</CommandEmpty>
                ) : (
                    // Default Suggestions
                    <>
                        {/* Popular Parks Section */}
                        <CommandGroup>
                            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700 border-b border-gray-100">
                                <MapPin className="h-4 w-4 text-teal-600" />
                                Popular Parks
                            </div>
                            {popularParks.map((park) => (
                                <CommandItem
                                    key={park.name}
                                    onSelect={() => { }}
                                    className="cursor-pointer flex flex-col items-start px-4 py-3"
                                >
                                    <div className="font-medium text-gray-900">{park.name}</div>
                                    <div className="text-sm text-gray-500">{park.country}</div>
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        {/* Trending Section */}
                        <CommandGroup>
                            <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700">
                                <TrendingUp className="h-4 w-4 text-orange-600" />
                                Trending Searches
                            </div>
                            <div className="px-2 pb-2">
                                <div className="flex flex-wrap gap-2">
                                    {trendingDestinations.map((destination) => (
                                        <button
                                            key={destination}
                                            onClick={() => { }}
                                            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                                        >
                                            {destination}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    );
}
