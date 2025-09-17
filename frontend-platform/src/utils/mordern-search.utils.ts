import { getParksAndCountries } from "@/lib/api/mordern-search.api";
import { SuggestionType } from "@/types/types";
import Fuse from "fuse.js";

// Fetch Parks and Countries from DB
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

// Get Parks and Countries Search Suggestions
export const getSearchSuggestions = async (
    setSuggestionsList: (suggestions: SuggestionType[]) => void,
) => {
    try {
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
        threshold: 0.4,
    };

    const suggestionsFuse = new Fuse(suggestionsList, suggestionsOptions);

    const filteredResults = suggestionsFuse.search(searchValue).slice(0, 5).map((result) => result.item);

    // Set Filtered Suggestions
    setFilteredSuggestions(filteredResults);
}