import { CountrySearchType, ParkSearchType } from "@/types";
import Fuse from "fuse.js";

// Handle Suggetsion filtering on input change(TextSearch.tsx)
export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    searchParksList: ParkSearchType[],
    searchCountriesList: CountrySearchType[],
    setFilteredSuggestions: React.Dispatch<React.SetStateAction<(ParkSearchType | CountrySearchType)[]>>,
    setIsSuggestionSelected: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSuggestionSelected(false);
  
    if (!value.trim()) {
      setFilteredSuggestions([]);
      return;
    }
  
    // Fuse options
    const parkOptions = {
      keys: ["name", "keyword"],
      threshold: 0.4,
    };
  
    const countryOptions = {
      keys: ["name"],
      threshold: 0.4,
    };
  
    const parkFuse = new Fuse(searchParksList, parkOptions);
    const countryFuse = new Fuse(searchCountriesList, countryOptions);
  
    const parkResults = parkFuse.search(value).slice(0, 5).map((result) => result.item);
    const countryResults = countryFuse.search(value).slice(0, 5).map((result) => result.item);
  
    setFilteredSuggestions([...parkResults, ...countryResults]);
  };
  

// Get parks from filtered suggestions (SuggestionBox.tsx)
export const getFilteredParks = (filteredSuggestions: (ParkSearchType | CountrySearchType)[]) => { 
    return filteredSuggestions.filter((item): item is ParkSearchType => 'keyword' in item).slice(0, 5);
}

// Get countries from from filtered suggestions (SuggestionBox.tsx)
export const getFilteredCountries = (filteredSuggestions: (ParkSearchType | CountrySearchType)[]) => {
    return filteredSuggestions.filter((item): item is CountrySearchType => !('keyword' in item)).slice(0, 5);
}
