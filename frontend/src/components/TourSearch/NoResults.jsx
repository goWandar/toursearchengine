import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

const NoResults = ({ message }) => {
  return (
    <div
      className='no-results'
      role='status'
      aria-live='polite'
      aria-atomic='true'>
      <FaSearch
        className='no-results-icon'
        aria-hidden='true'
      />
      <p className='no-results-message'>{message}</p>
    </div>
  );
};

NoResults.propTypes = {
  message: PropTypes.string.isRequired,
};

NoResults.defaultProps = {
  message: 'No results found. Try adjusting your search criteria.',
};

export default NoResults;
