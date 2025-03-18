import PropTypes from 'prop-types';
import TourCard from './TourCard';
import NoResults from './NoResults';
import '../../assets/_searchResultsDisplay.scss';

const SearchResultsDisplay = ({ results, onBookNow, hasSearched }) => {
  return (
    <div className={`search-results ${results.length === 0 && hasSearched ? 'no-results-center' : ''}`}>
      {hasSearched &&
        (results.length > 0 ? (
          results.map(tour => (
            <TourCard
              key={tour.id}
              image={tour.image}
              title={tour.title}
              price={tour.price}
              country={tour.country}
              places={tour.places}
              onBookNow={() => onBookNow(tour.id)}
            />
          ))
        ) : (
          <NoResults message='No tours match your search criteria. Please try again.' />
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
    }),
  ).isRequired,
  onBookNow: PropTypes.func.isRequired,
  hasSearched: PropTypes.bool.isRequired,
};

export default SearchResultsDisplay;
