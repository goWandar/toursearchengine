import PropTypes from 'prop-types';
import '../../assets/_tourCard.scss';

const TourCard = ({ image, title, price, country, places, onBookNow }) => {
  return (
    <div className='tour-card'>
      <div className='card-image'>
        <img
          src={image}
          alt={title}
          loading='lazy'
        />
      </div>
      <div className='card-content'>
        <h3 className='card-title'>{title}</h3>
        <div className='card-details'>
          <div className='card-price'>From ${price}</div>
          <div className='card-country'>{country}</div>
          <div className='card-places'>
            <span>Visits:</span>
            <ul>
              {places.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className='card-button'
          onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

TourCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  country: PropTypes.string.isRequired,
  places: PropTypes.arrayOf(PropTypes.string).isRequired,
  onBookNow: PropTypes.func.isRequired,
};

export default TourCard;
