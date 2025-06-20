import { Country, getAllCountries, getAllParks, Park } from "@/utils/tourService/textSearchUtils"
import { useEffect, useState } from "react"
import SuggestionBox from "./SuggestionBox";

const TextSearch = () => {
  const [searchDataList, setSearchDataList] = useState<(Park | Country)[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<(Park | Country)[]>([]);


  // Fetch all parks and countries on mount
  useEffect(() => {
    // First try fetching from localStorage on mount 
    const cachedData = localStorage.getItem("parksAndCountries");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setSearchDataList(parsedData);
      return;
    }

    const fetchParksCountries = async () => {
      try {
        const parks = await getAllParks();
        const countries = await getAllCountries();
        const combined = [...parks, ...countries];
        
        // Set the combined data for use
        setSearchDataList(combined);

        // Store the combined data in localStorage
        localStorage.setItem("parksAndCountries", JSON.stringify(combined));

      } catch (err) {
        console.error("Failed to fetch parks or countries", err);
      }
    };
  
    fetchParksCountries();
  }, []);

  // Handle Search Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter suggestions
    const suggestions = searchDataList.filter((item) => {
      let textToSearch: string = "";
      if ("keyword" in item && typeof item.keyword === "string") {
        textToSearch = item.keyword;
      } else if ("name" in item && typeof item.name === "string") {
        textToSearch = item.name;
      }
      return textToSearch.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredSuggestions(suggestions);
  };

  // Handle selection of a suggestion
  const handleSelect = (value: string) => {
    // Set input value to the selected suggestion
    setInputValue(value);

    // Hide suggestions on selection
    setFilteredSuggestions([]); // hide suggestions
  };

  

  return (
    <form>
      <label htmlFor="search">Search</label><br />
      <input
        id="search"
        type="text"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        style={{ padding: "8px", width: "300px", backgroundColor: "white", color: "black" }}
      />
      
      {/* Auto Suggestion Box */}
      <SuggestionBox 
        filteredSuggestions={filteredSuggestions}
        handleSelect={handleSelect}
        inputValue={inputValue}
      />

    </form>
  );
}



export default TextSearch