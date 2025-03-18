import PropTypes from 'prop-types';

const NoResults = ({ message }) => {
  return (
    <div className='no-results'>
      <p>{message}</p>
    </div>
  );
};

NoResults.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NoResults;
