'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/recipes/input/input';
import { getSearchSuggestions, handleSearch } from '@/utils/mordern-search.utils';
import { ParkSearchType, SuggestionType } from '@/types/types';
import { useRouter } from 'next/navigation'
import { SearchSuggestions } from './search-suggestions';

// TODO: Add logic to track popular destinations from user interactions
// TODO: Add logic to track trending destinations based on search patterns
// TODO: Add analytics for search behavior and destination popularity
// TODO: Integrate with backend API for real-time popular/trending data

interface ModernSearchProps {
  className?: string;
  placeholder?: string;
}

export function ModernSearch({
  className = '',
  placeholder = 'Search destinations and parks',
}: ModernSearchProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const [suggestionsList, setSuggestionsList] = useState<SuggestionType[]>([]);
  const [popularParks, setPopularParks] = useState<ParkSearchType[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<SuggestionType[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([]);
  const router = useRouter();

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
    getSearchSuggestions(setSuggestionsList, setPopularParks, setTrendingSearches, setIsLoading);
  }, []);

  // Handle Suggestions Search
  useEffect(() => {
    handleSearch(searchValue, suggestionsList, setFilteredSuggestions)
  }, [searchValue]);

  const handleDestinationSelect = (type: string, id: number, name: string) => {
    handleClose();
    setFilteredSuggestions([]);

    // Redirect using id and type in URL params
    router.push(`/search/${name}/?id=${id}&type=${type}`);
  };



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
          <SearchSuggestions
            isLoading={isLoading}
            filteredSuggestions={filteredSuggestions}
            searchValue={searchValue}
            popularParks={popularParks}
            trendingSearches={trendingSearches}
            handleDestinationSelect={handleDestinationSelect}
          />
        </div>
      )}
    </div>
  );
}