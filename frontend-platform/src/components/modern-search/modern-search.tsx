'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import { Input } from '@/recipes/input/input';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/recipes/command/command';
import { getSearchSuggestions } from '@/utils/mordern-search.utils';
import { CountrySearchType, ParkSearchType } from '@/types/types';

// Popular Parks data structure
const popularParks = [
  { name: 'Maasai Mara', country: 'Kenya' },
  { name: 'Serengeti', country: 'Tanzania' },
  { name: 'Okavango Delta', country: 'Botswana' },
  { name: 'Kruger Park', country: 'South Africa' },
];

// Trending destinations
const trendingDestinations = [
  'Great Migration',
  'Big 5 Safari',
  'Luxury Tented Camps',
  'Family Safari',
  'Photography Safari',
  'Honeymoon Safari',
];

// TODO: Add logic to track popular destinations from user interactions
// TODO: Add logic to track trending destinations based on search patterns
// TODO: Add analytics for search behavior and destination popularity
// TODO: Integrate with backend API for real-time popular/trending data

interface ModernSearchProps {
  className?: string;
  placeholder?: string;
  onDestinationSelect?: (destination: string) => void;
}

export function ModernSearch({
  className = '',
  placeholder = 'Search destinations',
  onDestinationSelect
}: ModernSearchProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchParksList, setSearchParksList] = useState<ParkSearchType[]>([]);
  const [searchCountriesList, setSearchCountriesList] = useState<CountrySearchType[]>([]);


  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSearchOpen(false);
      setIsAnimating(false);
    }, 150);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Fetch Countries and Parks suggestions on mount
  useEffect(() => {
    getSearchSuggestions(setSearchParksList, setSearchCountriesList)
  }, []);

  const handleDestinationSelect = (destination: string) => {
    setSearchValue(destination);
    handleClose();
    onDestinationSelect?.(destination);
  };

  // Filter destinations based on search value - show all if no search value
  const filteredParks = searchValue
    ? popularParks.filter((park) =>
      park.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      park.country.toLowerCase().includes(searchValue.toLowerCase())
    )
    : popularParks;

  const filteredTrending = searchValue
    ? trendingDestinations.filter((destination) =>
      destination.toLowerCase().includes(searchValue.toLowerCase())
    )
    : trendingDestinations;

  const hasResults = filteredParks.length > 0 || filteredTrending.length > 0;

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setSearchOpen(true)}
        className={`pl-10 pr-4 transition-all duration-200 ${searchOpen ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
          }`}
      />

      {/* Search Dropdown */}
      {(searchOpen || isAnimating) && (
        <div className={`absolute top-full left-0 right-0 mt-2 bg-white border border-input rounded-md shadow-lg z-50 transition-all duration-150 ease-out ${searchOpen && !isAnimating
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-2 scale-95'
          }`}>
          <Command className="rounded-md border-0">
            <CommandList className="max-h-[400px] overflow-y-auto overflow-x-hidden">
              {!hasResults && searchValue && (
                <CommandEmpty>No destinations found.</CommandEmpty>
              )}

              {/* Popular Parks Section */}
              {filteredParks.length > 0 && (
                <CommandGroup>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700 border-b border-gray-100">
                    <MapPin className="h-4 w-4 text-teal-600" />
                    Popular Parks
                  </div>
                  {filteredParks.map((park) => (
                    <CommandItem
                      key={park.name}
                      onSelect={() => handleDestinationSelect(park.name)}
                      className="cursor-pointer flex flex-col items-start px-4 py-3"
                    >
                      <div className="font-medium text-gray-900">{park.name}</div>
                      <div className="text-sm text-gray-500">{park.country}</div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Trending Section */}
              {filteredTrending.length > 0 && (
                <CommandGroup>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-gray-700">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    Trending
                  </div>
                  <div className="px-2 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {filteredTrending.map((destination) => (
                        <button
                          key={destination}
                          onClick={() => handleDestinationSelect(destination)}
                          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                        >
                          {destination}
                        </button>
                      ))}
                    </div>
                  </div>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}