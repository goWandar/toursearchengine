import { getParksAndCountries, getToursByCountryId, getToursByParkId } from "@/lib/api/mordern-search.api";
import { paginationType, SuggestionType, Tour } from "@/types/types";
import Fuse from "fuse.js";

// GET Parks and Countries Search Suggestions from DB
const fetchParksCountries = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
) => {
    try {
        const parksCountries = await getParksAndCountries();

        const combined: SuggestionType[] = [
            ...parksCountries.parks,
            ...parksCountries.countries,
        ];

        setSuggestionsList(combined);

        return parksCountries;

    } catch (error) {
        console.error("Failed to fetch parks or countries", error);
    }
};

// GET Parks and Countries Search Suggestions
export const getSearchSuggestions = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
    setIsLoading: (isLoading: boolean) => void
) => {
    try {
        setIsLoading(true);
        const cachedSuggestions = localStorage.getItem("parksAndCountries");

        // First Check in Local Storage
        if (cachedSuggestions) {
            const parsedData = JSON.parse(cachedSuggestions);

            const combined: SuggestionType[] = [
                ...(parsedData.parks ?? []),
                ...(parsedData.countries ?? []),
            ];

            setSuggestionsList(combined || []);
            return;
        }

        // Fetch from DB
        const parksCountries = await fetchParksCountries(
            setSuggestionsList
        );

        if (parksCountries) {
            localStorage.setItem("parksAndCountries", JSON.stringify(parksCountries));
        }
    } catch (error) {
        console.error("Failed to get search suggestions", error);
        setSuggestionsList([]);
    } finally {
        setIsLoading(false);
    }
};

// Handle Parks and Countries Search
export const handleSearch = (
    searchValue: string,
    suggestionsList: SuggestionType[],
    setFilteredSuggestions: React.Dispatch<React.SetStateAction<(SuggestionType[])>>,
) => {

    if (!searchValue.trim()) {
        setFilteredSuggestions([]);
        return;
    }

    // Fuse options
    const suggestionsOptions = {
        keys: ["name", "keyword"],
        threshold: 0.25,
    };

    const suggestionsFuse = new Fuse(suggestionsList, suggestionsOptions);

    const filteredResults = suggestionsFuse.search(searchValue).slice(0, 5).map((result) => result.item);

    // Set Filtered Suggestions
    setFilteredSuggestions(filteredResults);
}

// GET Park's/Countries Tour Results
export const fetchTours = async (
    id: number, type: string, paginationMeta: paginationType,
    setTourResults: React.Dispatch<React.SetStateAction<Tour[]>>,
    setPaginationMeta: React.Dispatch<React.SetStateAction<paginationType>>,
) => {
    try {
        // Fetch from DB
        if (type === 'park') {
            const toursByPark = await getToursByParkId(id, paginationMeta);
            setTourResults(toursByPark.tours);
            setPaginationMeta(toursByPark.pagination);
            return toursByPark;
        } else if (type === 'country') {
            const toursByCountry = await getToursByCountryId(id, paginationMeta);
            console.log(toursByCountry);
            setTourResults(toursByCountry.tours);
            setPaginationMeta(toursByCountry.pagination);
            return toursByCountry;
        }

    } catch (error) {
        console.error("Failed to fetch parks or countries", error);
    }
};