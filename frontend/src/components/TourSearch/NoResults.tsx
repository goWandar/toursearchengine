import { FaSearch } from 'react-icons/fa';

const NoResults = ({ message = 'No results found. Try adjusting your search criteria.' }) => {
  return (
    <div className='no-results' role='status' aria-live='polite' aria-atomic='true'>
      <FaSearch className='no-results-icon' aria-hidden='true' />
      <p className='no-results-message'>{message}</p>
    </div>
  );
};

export default NoResults;
