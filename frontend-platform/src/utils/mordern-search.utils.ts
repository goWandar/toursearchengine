import { getParksAndCountries } from "@/lib/api/mordern-search.api";
import { SuggestionType } from "@/types/types";



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
            console.log("Parsed Data:", parsedData);

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