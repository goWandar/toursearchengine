import PropTypes from "prop-types";
import TourCard from "./TourCard";
import NoResults from "./NoResults";
import "../../assets/_searchResultsDisplay.scss";
import Spinner from "../Spinner/Spinner";
import { useMemo } from "react";

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

function getRandomImage(images) {
  const randomImage =
    "https://moafrikatours.com/wp-content/uploads/2022/02/4202426-1316341_150_5_1450_893_650_400-1.jpg";
  if (images.length != 0) {
    //TODO this no longer randomizes but take the first picture from the array
    return images[0].image_urls;
  } else {
    return randomImage;
  }
}

function getPrice(prices) {
  if (prices.length === 0) return " NO PRICES";
  const amountInfo = prices.find((info) => info.numOfPeople === 1);

  if (amountInfo === undefined) {
    return " PRICE UNDEFINED";
  }
  return amountInfo.pricePerPerson;
}

const SearchResultsDisplay = ({
  results,
  onBookNow,
  hasSearched,
  loading = false,
  loadingMessage = "Loading tours...",
}) => {
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
          <>
            <div className="results-grid">
              {results.map((tour) => {
                return (
                  <TourCard
                    key={tour.id}
                    image={getRandomImage(tour.images)}
                    title={tour.title}
                    price={getPrice(tour.prices)}
                    country={tour.country}
                    places={tour.location.split(",")}
                    onBookNow={() => onBookNow(tour.id)}
                  />
                );
              })}
            </div>
          </>
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
