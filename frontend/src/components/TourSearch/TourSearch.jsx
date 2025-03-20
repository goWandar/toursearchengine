import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import "../../assets/_tourSearch.scss";
import { getTours } from "../../api/api";
import { set } from "react-hook-form";

const TourSearch = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [openInput, setOpenInput] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const result = await getTours();
      //FIXME the data for some reason is nesting into Tour[][] so I'm using flat to get the data
      const tours = result.data.flat();
      setTours(tours);
      setIsSearchDisabled(false);
    };
    fetchTours();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-input")) {
        setOpenInput(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const parseDaysFilter = (daysFilter) => {
    if (!daysFilter || daysFilter === "Any") return { min: 0, max: Infinity };
    const [min, max] = daysFilter.split("-").map((s) => {
      const num = parseInt(s.replace(/\D/g, ""));
      return isNaN(num) ? Infinity : num;
    });
    return { min, max: max || Infinity };
  };

  const parseBudgetFilter = (budgetFilter) => {
    if (!budgetFilter) return { min: 0, max: Infinity };
    const numbers = budgetFilter.match(/\d+/g).map(Number);
    const min = numbers[0] || 0;
    const max = numbers[1] || Infinity;
    return { min, max };
  };

  const handleSearch = () => {
    setHasSearched(true);
    const daysFilter = parseDaysFilter(days);
    const budgetFilter = parseBudgetFilter(budget);

    const filteredResults = tours.filter((tour) => {
      // console.log(tour);
      const matchesLocation =
        location === "Anywhere" ||
        !location ||
        tour.country.toLowerCase() === location.toLowerCase();
      const matchesType =
        !type || tour.type.toLowerCase() === type.toLowerCase();
      const matchesDays =
        days === "Any" ||
        (tour.durationInDays >= daysFilter.min &&
          tour.durationInDays <= daysFilter.max);
      const matchesBudget =
        tour.price >= budgetFilter.min && tour.price <= budgetFilter.max;
      const matchesAccommodation =
        !selectedOption || tour.accommodationType === selectedOption;
      //FIXME This currently only filters by location and days
      return matchesLocation && matchesDays;
      // matchesLocation &&
      // matchesType &&
      // matchesDays
      // matchesBudget &&
      // matchesAccommodation
    });
    setSearchResults(filteredResults);
  };

  const daysOptions = ["Any", "1 - 5", "6 - 10", "10 - 15", "15+"];

  const handleDaysSelect = (selectedDays) => {
    setDays(selectedDays);
    setOpenInput(null);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  const handleBookNow = (tourId) => {
    console.log("Booking tour:", tourId);
    // Add booking logic here
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  return (
    <div className="tour-search-container">
      <nav className="tour-search-navbar">
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </nav>
      <div className="tour-search-content">
        <h1>Tour Search</h1>
        <div className="search-inputs-row">
          <SearchInput
            placeholder="Where to"
            options={[
              "Anywhere",
              "Kenya",
              "Tanzania",
              "South Africa",
              "Botswana",
            ]}
            onSelect={handleLocationSelect}
            isOpen={openInput === "location"}
            setIsOpen={setOpenInput}
            inputName="location"
          />
          <SearchInput
            placeholder="Type"
            options={["Luxury", "Mid-range", "Budget"]}
            onSelect={setType}
            isOpen={openInput === "type"}
            setIsOpen={setOpenInput}
            inputName="type"
          />
          <div className={`days-input-container search-input`}>
            <div
              className={`input-container ${!days ? "placeholder" : ""}`}
              onClick={() => setOpenInput("days")}
            >
              {days || "Days"}
            </div>
            {openInput === "days" && (
              <ul className="options-list">
                {daysOptions.map((option) => (
                  <li key={option} onClick={() => handleDaysSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchInput
            placeholder="Budget"
            options={[
              "0 - $499",
              "$500 - $1499",
              "$1500 - $2999",
              "$3000 - $4999",
              "$5000+",
            ]}
            onSelect={setBudget}
            isOpen={openInput === "budget"}
            setIsOpen={setOpenInput}
            inputName="budget"
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={isSearchDisabled}
          >
            {tours.length > 0 ? "Search" : "Loading..."}
          </button>
        </div>
        <div className="checkboxes-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOption === "lodge"}
              onChange={() => handleOptionChange("lodge")}
            />
            Lodge
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOption === "camp"}
              onChange={() => handleOptionChange("camp")}
            />
            Camp
          </label>
        </div>

        <SearchResultsDisplay
          results={searchResults}
          onBookNow={handleBookNow}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
};

export default TourSearch;
