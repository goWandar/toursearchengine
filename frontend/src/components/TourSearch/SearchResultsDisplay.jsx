import PropTypes from "prop-types";
import TourCard from "./TourCard";
import NoResults from "./NoResults";
import "../../assets/_searchResultsDisplay.scss";
import { GiConsoleController } from "react-icons/gi";

// Function to get a random image from the images array and provide a default image if the array is empty
function getRandomImage(images) {
  const randomImage =
    "https://moafrikatours.com/wp-content/uploads/2022/02/4202426-1316341_150_5_1450_893_650_400-1.jpg";
  if (images.length != 0) {
    return images[Math.floor(Math.random() * images.length)].image_urls;
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

const SearchResultsDisplay = ({ results, onBookNow, hasSearched }) => {
  return (
    <div
      className={`search-results ${
        results.length === 0 && hasSearched ? "no-results-center" : ""
      }`}
    >
      {hasSearched &&
        (results.length > 0 ? (
          results.map((tour) => (
            <TourCard
              key={tour.id}
              image={getRandomImage(tour.images)}
              title={tour.title}
              price={getPrice(tour.prices)}
              country={tour.country}
              places={tour.location.split(",")}
              onBookNow={() => onBookNow(tour.id)}
            />
          ))
        ) : (
          <NoResults message="No tours match your search criteria. Please try again." />
        ))}
    </div>
  );
};

SearchResultsDisplay.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      places: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onBookNow: PropTypes.func.isRequired,
  hasSearched: PropTypes.bool.isRequired,
};

export default SearchResultsDisplay;
