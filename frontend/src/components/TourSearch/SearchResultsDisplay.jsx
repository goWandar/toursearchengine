import PropTypes from "prop-types";
import TourCard from "./TourCard";
import NoResults from "./NoResults";
import "../../assets/_searchResultsDisplay.scss";
import Spinner from "../Spinner/Spinner";

/**
 * Displays tour search results with loading states and empty results handling
 *
 * @param {Object} props - Component props
 * @param {Array} props.results - Array of tour results to display
 * @param {Function} props.onBookNow - Callback when book now is clicked
 * @param {Boolean} props.hasSearched - Flag if search has been performed
 * @param {Boolean} [props.loading=false] - Loading state
 * @param {String} [props.loadingMessage='Loading tours...'] - Loading message
 * @returns {JSX.Element} The search results display component
 */
const SearchResultsDisplay = ({
  results,
  onBookNow,
  hasSearched,
  loading = false,
  loadingMessage = "Loading tours...",
}) => {
  console.log({ results, hasSearched, loading, loadingMessage });
  return (
    <div
      className={`search-results ${
        results.length === 0 && hasSearched ? "no-results-center" : ""
      }`}
      aria-live="polite"
      aria-busy={loading}
    >
      {loading ? (
        <Spinner size={60} color="#2c3e50" loadingMessage={loadingMessage} />
      ) : hasSearched ? (
        results.length > 0 ? (
          <div className="results-grid">
            {results.map((tour) => (
              <TourCard
                key={tour.id}
                image={tour.images[1]}
                title={tour.title}
                price={tour.displayPrice}
                country={tour.country}
                places={tour.location.split(", ").map((tour) => tour.trim())}
                onBookNow={() => onBookNow(tour.id)}
              />
            ))}
          </div>
        ) : (
          <NoResults message="No tours match your search criteria. Please try a different criteria." />
        )
      ) : null}
    </div>
  );
};

// Prop type validation
SearchResultsDisplay.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      displayImage: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      displayPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      country: PropTypes.string.isRequired,
      places: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onBookNow: PropTypes.func.isRequired,
  hasSearched: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

// Default props
SearchResultsDisplay.defaultProps = {
  loading: false,
  loadingMessage: "Loading tours...",
};

export default SearchResultsDisplay;
