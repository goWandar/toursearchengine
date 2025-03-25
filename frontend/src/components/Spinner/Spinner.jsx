import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import '../../assets/_spinner.scss';

const Spinner = ({ size = 50, color = '#3498db', loadingMessage = '' }) => {
  return (
    <div className='spinner-container'>
      <ClipLoader
        size={size}
        color={color}
        loading={true}
        aria-label='Loading spinner'
      />
      {loadingMessage && <p className='spinner-message'>{loadingMessage}</p>}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  loadingMessage: PropTypes.string,
};

Spinner.defaultProps = {
  size: 50,
  color: '#3498db',
  loadingMessage: '',
};

export default Spinner;
