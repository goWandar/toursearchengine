import { getParksAndCountries } from "@/lib/api/mordern-search.api";
import { CountrySearchType, ParkSearchType } from "@/types/types";

// Fetch Parks and Countries from DB
const fetchParksCountries = async (
    setSearchParksList: (parks: ParkSearchType[]) => void,
    setSearchCountriesList: (countries: CountrySearchType[]) => void
) => {
    try {
        const parksCountries = await getParksAndCountries();

        setSearchParksList(parksCountries.parks);
        setSearchCountriesList(parksCountries.countries);
        return parksCountries;

    } catch (error) {
        console.error("Failed to fetch parks or countries", error);
    }
};

// Get Parks and Countries Search Suggestions
export const getSearchSuggestions = async (
    setSearchParksList: (parks: ParkSearchType[]) => void,
    setSearchCountriesList: (countries: CountrySearchType[]) => void
) => {
    try {
        const cachedSuggestions = localStorage.getItem("parksAndCountries");

        if (cachedSuggestions) {
            const parsedData = JSON.parse(cachedSuggestions);
            setSearchParksList(parsedData.parks || []);
            setSearchCountriesList(parsedData.countries || []);
            return;
        }

        const parksCountries = await fetchParksCountries(
            setSearchParksList,
            setSearchCountriesList
        );

        if (parksCountries) {
            localStorage.setItem("parksAndCountries", JSON.stringify(parksCountries));
        }
    } catch (error) {
        console.error("Failed to get search suggestions", error);
        setSearchParksList([]);
        setSearchCountriesList([]);
    }
};