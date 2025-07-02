import { CountrySearchType, ParkSearchType } from "@/types";
import Fuse from "fuse.js";
import { getToursByCountryId, getToursByParkId } from "@/api/api";
import { TourStoreType, TextSearchStoreType } from "@/store/store";

// Handle Suggetsion filtering on input change(TextSearchInput.tsx)
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
  

// Get parks from filtered suggestions (TextSearchSuggestion.tsx)
export const getFilteredParks = (filteredSuggestions: (ParkSearchType | CountrySearchType)[]) => { 
    return filteredSuggestions.filter((item): item is ParkSearchType => 'keyword' in item).slice(0, 5);
}

// Get countries from from filtered suggestions (TextSearchSuggestion.tsx)
export const getFilteredCountries = (filteredSuggestions: (ParkSearchType | CountrySearchType)[]) => {
    return filteredSuggestions.filter((item): item is CountrySearchType => !('keyword' in item)).slice(0, 5);
}

// Handle fetch tours(TextSearchResults.tsx)
interface FetchToursParams {
  id: string | null;
  type: "country" | "park" | null;
  page: number;
  limit: number;
  append: boolean;
  setLoading: (val: boolean) => void;

  // Zustand actions
  setTours: TourStoreType["setTours"];
  addTours: TourStoreType["addTours"];
  setPagination: TourStoreType["setPagination"];
  resetTours: TourStoreType["resetTours"];
  selectedId: TextSearchStoreType["selectedSuggestionId"];
  selectedType: TextSearchStoreType["selectedSuggestionType"];
  setSelectedId: TextSearchStoreType["setSelectedSuggestionId"];
  setSelectedType: TextSearchStoreType["setSelectedSuggestionType"];
  resetSelectedSuggestion: TextSearchStoreType["resetSelectedSuggestion"];
}


export const fetchToursHandler = async ({
  id,
  type,
  page,
  limit,
  append,
  setLoading,
  setTours,
  addTours,
  setPagination,
  resetTours,
  selectedId,
  selectedType,
  setSelectedId,
  setSelectedType,
  resetSelectedSuggestion,
}: FetchToursParams) => {
  if (!id || !type) return;

  const idNum = Number(id);

  // If it’s the initial load and already matches — skip
  if (page === 1 && idNum === selectedId && type === selectedType) {
    return;
  }

  // If fresh — reset state
  if (!append) {
    resetSelectedSuggestion();
    resetTours();
  }

  setLoading(true);

  let tourData;

  if (type === "country") {
    tourData = await getToursByCountryId(idNum, page, limit);
  } else if (type === "park") {
    tourData = await getToursByParkId(idNum, page, limit);
  }

  if (tourData) {
    if (append) {
      addTours(tourData.tours);
    } else {
      setTours(tourData.tours);
    }

    const { pagination } = tourData;

    setPagination({
      page: pagination.page || page,
      limit: pagination.limit || limit,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 1,
      hasMore: (pagination.page || page) < (pagination.totalPages || 1),
    });

    if (!append) {
      setSelectedId(idNum);
      setSelectedType(type);
    }
  }

  setLoading(false);
}; 
