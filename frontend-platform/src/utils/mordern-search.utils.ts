import { getAllCountries, getAllParks } from "@/lib/api/mordern-search.api";
import { CountrySearchType, ParksCountriesType, ParkSearchType } from "@/types/types";

// Fetch Parks and Countries from DB
const fetchParksCountries = async (
    setSearchParksList: (parks: ParkSearchType[]) => void,
    setSearchCountriesList: (countries: CountrySearchType[]) => void
) => {
    try {
        const parks = await getAllParks();
        const countries = await getAllCountries();

        const combined: ParksCountriesType = {
            parks,
            countries,
        };

        setSearchParksList(parks);
        setSearchCountriesList(countries);
        return combined;

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