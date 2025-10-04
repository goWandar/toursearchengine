'use client';

import { MapPin, Palmtree, Globe2Icon, TrendingUp } from 'lucide-react';
import {
    CommandGroup,
    CommandItem,
    CommandList,
    CommandEmpty,
    Command,
} from '@/recipes/command/command';
import { ParkSearchType, SuggestionType } from '@/types/types';
import { Skeleton } from '@/recipes/skeleton/skeleton';

interface SearchSuggestionsProps {
    isLoading: boolean;
    filteredSuggestions: SuggestionType[];
    searchValue: string;
    popularParks: ParkSearchType[];
    trendingSearches: SuggestionType[];
    handleDestinationSelect: (type: string, id: number, name: string) => void;
}

export function SearchSuggestions({
    isLoading,
    filteredSuggestions,
    searchValue,
    popularParks,
    trendingSearches,
    handleDestinationSelect,
}: SearchSuggestionsProps) {
    const capitalize = (str: string) =>
        str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

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
                                        handleDestinationSelect(suggestion.type, suggestion.id, suggestion.name)
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
                                    {suggestion.type === 'park' && 'country' in suggestion ? (
                                        <div className="pl-6 text-sm text-gray-500">{suggestion.country}</div>
                                    ) : null}
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
                            {popularParks.map((park, idx) => (
                                <CommandItem
                                    key={idx}
                                    onSelect={() =>
                                        handleDestinationSelect(park.type, park.id, park.name)
                                    }
                                    className="cursor-pointer flex flex-col items-start px-4 py-3"
                                >
                                    {/* Capitalize first letter only */}
                                    <div className="font-medium text-gray-900">{capitalize(park.keyword)}</div>
                                    {park.type === 'park' && 'country' in park ? (
                                        <div className="text-sm text-gray-500">{park.country}</div>
                                    ) : null}
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
                                    {trendingSearches.map((search, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleDestinationSelect(search.type, search.id, search.name)}
                                            className="flex items-center pl-3 pr-5 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                                        >
                                            {search.type === 'park' ? (
                                                <Palmtree className="h-4 w-4 text-gray-400 mr-2" />
                                            ) : (
                                                <Globe2Icon className="h-4 w-4 text-gray-400 mr-2" />
                                            )}
                                            {search.type === 'park' && 'keyword' in search
                                                ? capitalize(search.keyword)
                                                : search.name}
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
