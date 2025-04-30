import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import useSearchToursAPI from "../../hooks/useSearchToursAPI";
import "../../assets/_tourSearch.scss";
import { createUrlwithFilter } from "../../utils/tourService/tourUtils";
import useStore from "../../store/store";
import { useMemo } from "react";
import { FaLeaf } from "react-icons/fa";

/**
 * Main tour search component with filters and results display
 */
const TourSearch = () => {
  // State for search filters
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    days: "",
    budget: "",
    accommodationType: "",
    safariType: "",
  });

  const { tours, addTours, setTours } = useStore();

  //State for cursor
  const [cursor, setCursor] = useState(0);

  // State for tracking which input dropdown is open
  const [openInput, setOpenInput] = useState(null);

  // Flag to indicate if search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  //State for fetching more results
  const [fetchMoreResult, setFetchMoreResult] = useState([]);

  let searchURL = createUrlwithFilter(filters, cursor);

  //Initialize tour service hook
  const { refetch, isLoading } = useSearchToursAPI(searchURL);

  // Effect for handling clicks outside of open dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-input")) {
        setOpenInput(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /**
   * Handles search button click
   * Fetches data if not already loaded, then filters results
   */
  const handleSearch = async () => {
    const updatedCursor = 0;
    setCursor(updatedCursor);

    const url = createUrlwithFilter(filters, updatedCursor);
    const { data: response, isSuccess } = await refetch(url);

    if (isSuccess) {
      setTours(response.data.tours);
      if (response.data.cursor > 0) setCursor(response.data.cursor);
      setHasSearched(true);
    }
  };

  const handleShowMore = async () => {
    const url = createUrlwithFilter(filters, cursor);
    const { data: response, isSuccess } = await refetch(url);

    if (isSuccess) {
      addTours(response.data.tours);
      if (response.data.cursor > 0) setCursor(response.data.cursor);
      setHasSearched(true);
    }
  };

  /**
   * Updates filter state when inputs change
   * @param {String} name - Filter name
   * @param {*} value - New filter value
   */
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    // NEW: Close dropdown after selecting an option
    setOpenInput(null);
  };

  // Handler for book now button clicks
  const handleBookNow = (tourId) => {
    console.log("Booking tour:", tourId);
    // TODO: Implement booking logic
  };

  // Options for days filter dropdown
  //TODO must address the 15+ this as the server doesnt accept it
  const daysOptions = ["Any", "1 - 5", "6 - 10", "10 - 15", "15+"];

  return (
    <div className="tour-search-container">
      <nav className="tour-search-navbar">
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </nav>

      <div className="tour-search-content">
        <h1>Tour Search</h1>
        {/* Search filters row */}
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
            onSelect={(value) => handleFilterChange("location", value)}
            isOpen={openInput === "location"}
            setIsOpen={(shouldOpen) =>
              setOpenInput(shouldOpen ? "location" : null)
            }
          />

          <SearchInput
            placeholder="Type"
            options={["Luxury", "Mid-range", "Budget"]}
            onSelect={(value) => handleFilterChange("type", value)}
            isOpen={openInput === "type"}
            setIsOpen={(shouldOpen) => setOpenInput(shouldOpen ? "type" : null)}
          />

          <SearchInput
            placeholder="Days"
            options={daysOptions}
            onSelect={(value) => handleFilterChange("days", value)}
            isOpen={openInput === "days"}
            setIsOpen={(shouldOpen) => setOpenInput(shouldOpen ? "days" : null)}
          />

          <SearchInput
            placeholder="Budget"
            options={[
              "0 - $499",
              "$500 - $1499",
              "$1500 - $2999",
              "$3000 - $4999",
              "$5000+", //TODO must address this as the server doesnt accept it
            ]}
            onSelect={(value) => handleFilterChange("budget", value)}
            isOpen={openInput === "budget"}
            setIsOpen={(shouldOpen) =>
              setOpenInput(shouldOpen ? "budget" : null)
            }
          />

          <button
            className="search-button"
            onClick={handleSearch}
            disabled={isLoading}
          >
            Search
          </button>
        </div>
        {/* Accommodation type checkboxes */}
        <div className="checkboxes-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.accommodationType === "lodge"}
              onChange={() =>
                handleFilterChange(
                  "accommodationType",
                  filters.accommodationType === "lodge" ? null : "lodge"
                )
              }
            />
            Lodge
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.accommodationType === "camp"}
              onChange={() =>
                handleFilterChange(
                  "accommodationType",
                  filters.accommodationType === "camp" ? null : "camp"
                )
              }
            />
            Camp
          </label>
        </div>
        {/* Results display area */}
        <SearchResultsDisplay
          results={tours}
          onBookNow={handleBookNow}
          hasSearched={hasSearched}
          loading={isLoading}
          loadingMessage="Finding tours..."
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <button onClick={handleShowMore}>Show More</button>
      </div>
    </div>
  );
};

export default TourSearch;
