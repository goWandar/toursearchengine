import '../../assets/_tourCard.scss';

interface TourCardProps {
  image: string;
  title: string;
  price: string | number;
  country?: string;
  places?: string[];
  onBookNow: () => void;
}

const TourCard = ({ image, title, price, country, places, onBookNow }: TourCardProps) => {
  return (
    <div className='tour-card'>
      <div className='card-image'>
        <img src={image} alt={title} loading='lazy' />
      </div>
      <div className='card-content'>
        <h3 className='card-title'>{title}</h3>
        <div className='card-details'>
          <div className='card-price'>From ${price}</div>
          <div className='card-country'>{country}</div>
          <div className='card-places'>
            <span>Visits:</span>
            <ul>
              {places?.map((place, index) => {
                return <li key={index}>{place}</li>;
              })}
            </ul>
          </div>
        </div>
        <button className='card-button' onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
