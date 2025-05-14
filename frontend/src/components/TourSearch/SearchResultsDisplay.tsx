import { Tour } from '@/types/types';
import { v4 as uuidv4 } from 'uuid';
import '../../assets/_searchResultsDisplay.scss';
import Spinner from '../Spinner/Spinner';
import NoResults from './NoResults';
import TourCard from './TourCard';

interface SearchResultsDisplayProps {
  results: Tour[];
  onBookNow: (tourId: string) => void;
  hasSearched: boolean;
  loading?: boolean;
  loadingMessage?: string;
}

type TourImage = Tour['images'][0];
type TourPrice = Tour['prices'][0];

function getRandomImage(images: TourImage[]) {
  const randomImage =
    'https://moafrikatours.com/wp-content/uploads/2022/02/4202426-1316341_150_5_1450_893_650_400-1.jpg';
  if (images.length !== 0) {
    //TODO this no longer randomizes but take the first picture from the array
    return images[0].image_urls;
  } else {
    return randomImage;
  }
}

function getPrice(prices: TourPrice[]) {
  if (prices.length === 0) return ' NO PRICES';
  const amountInfo = prices.find((info) => info.numOfPeople === 1);

  if (amountInfo === undefined) {
    return ' PRICE UNDEFINED';
  }
  return amountInfo.pricePerPerson;
}

const SearchResultsDisplay: React.FC<SearchResultsDisplayProps> = ({
  results = [],
  onBookNow,
  hasSearched,
  loading = false,
  loadingMessage = 'Loading tours...',
}) => {
  return (
    <div
      className={`search-results ${
        (!results || results.length === 0) && hasSearched ? 'no-results-center' : ''
      }`}
      aria-live='polite'
      aria-busy={loading}
    >
      {loading ? (
        <Spinner size={60} color='#2c3e50' loadingMessage={loadingMessage} />
      ) : hasSearched ? (
        results && results.length > 0 ? (
          <>
            <div className='results-grid'>
              {results.map((tour) => {
                return (
                  <TourCard
                    key={uuidv4() + tour.uniqueId}
                    image={getRandomImage(tour.images)}
                    title={tour.title}
                    price={getPrice(tour.prices)}
                    country={tour.country}
                    places={tour.location.split(',')}
                    onBookNow={() => onBookNow(tour.id)}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <NoResults message='No tours match your search criteria. Please try a different criteria.' />
        )
      ) : null}
    </div>
  );
};

export default SearchResultsDisplay;
