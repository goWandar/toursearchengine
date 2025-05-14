import { ClipLoader } from 'react-spinners';
import '../../assets/_spinner.scss';

interface SpinnerProps {
  size?: number;
  color?: string;
  loadingMessage?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, color = '#3498db', loadingMessage = '' }) => {
  return (
    <div className='spinner-container'>
      <ClipLoader size={size} color={color} loading={true} aria-label='Loading spinner' />
      {loadingMessage && <p className='spinner-message'>{loadingMessage}</p>}
    </div>
  );
};

export default Spinner;
