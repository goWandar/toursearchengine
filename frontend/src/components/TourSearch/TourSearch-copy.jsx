import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import SearchResultsDisplay from "./SearchResultsDisplay";
import useTourService from "../../services/useTourService";
import "../../assets/_tourSearch.scss";

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
  });

  // State for tracking which input dropdown is open
  const [openInput, setOpenInput] = useState(null);

  // Flag to indicate if search has been performed
  const [hasSearched, setHasSearched] = useState(false);

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // Initialize tour service hook
  const { tours, loading, fetchTours, filterTours, getRandomImage, getPrice } =
    useTourService();

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
    setHasSearched(true);

    try {
      let toursToFilter = tours;

      // Only fetch data if not already loaded
      if (tours.length === 0) {
        toursToFilter = await fetchTours();
      }

      // Filter and process results
      const filtered = filterTours(toursToFilter, filters);
      const processedResults = filtered.map((tour) => ({
        ...tour,
        displayImage: getRandomImage(tour.images),
        displayPrice: getPrice(tour.prices),
        places: tour.location?.split(",") || [],
      }));

      setSearchResults(processedResults);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
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
              "$5000+",
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
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
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
          results={searchResults}
          onBookNow={handleBookNow}
          hasSearched={hasSearched}
          loading={loading}
          loadingMessage="Finding tours..."
        />
      </div>
    </div>
  );
};

export default TourSearch;
