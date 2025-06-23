import { useEffect, useState } from "react";
import SuggestionBox from "./SuggestionBox";
import { CountrySearchType, ParksCountries, ParkSearchType } from "@/types";
import { getAllCountries, getAllParks } from "@/api/api";
import { handleInputChange } from "@/utils/tourService/textSearchUtils";

const TextSearch = () => {
  const [searchParksList, setSearchParksList] = useState<ParkSearchType[]>([]);
  const [searchCountriesList, setSearchCountriesList] = useState<CountrySearchType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<(ParkSearchType | CountrySearchType)[]>([]);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  // Fetch all parks and countries on mount
  useEffect(() => {
    const cachedData = localStorage.getItem("parksAndCountries");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setSearchParksList(parsedData.parks);
      setSearchCountriesList(parsedData.countries);
      return;
    }

    const fetchParksCountries = async () => {
      try {
        const parks = await getAllParks();
        const countries = await getAllCountries();

        const combined: ParksCountries = {
          parks,
          countries,
        };

        setSearchParksList(parks);
        setSearchCountriesList(countries);
        localStorage.setItem("parksAndCountries", JSON.stringify(combined));
      } catch (err) {
        console.error("Failed to fetch parks or countries", err);
      }
    };

    fetchParksCountries();
  }, []);

  // Handle Search Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setInputValue, searchParksList, searchCountriesList, setFilteredSuggestions, setIsSuggestionSelected);
  };

  // Handle selection of a suggestion
  const handleSelect = (value: string) => {
    setInputValue(value);
    setFilteredSuggestions([]);
    setIsSuggestionSelected(true);
  };

  return (
    <form>
      <label htmlFor="search" className="form-label">Search</label><br />

      <div className="d-flex flex-column flex-md-row align-items-start gap-2">
        <input
          id="search"
          type="text"
          value={inputValue}
          onChange={handleChange}
          autoComplete="off"
          className="form-control w-auto"
        />

        {/* Submit Button */}
        {isSuggestionSelected && (
          <input
            type="submit"
            value="Search"
            className="btn btn-primary"
          />
        )}
      </div>

      {/* Auto Suggestion Box */}
      <SuggestionBox
        filteredSuggestions={filteredSuggestions}
        handleSelect={handleSelect}
        inputValue={inputValue}
        isSuggestionSelected={isSuggestionSelected}
      />

    </form>
  );
};

export default TextSearch;
