import PropTypes from 'prop-types';
import { useState } from 'react';

const SearchInput = ({ placeholder, options, onSelect, isOpen, setIsOpen, inputName }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(null);
  };

  return (
    <div className='search-input'>
      <div
        className={`input-container ${!selectedOption ? 'placeholder' : ''}`}
        onClick={e => {
          e.stopPropagation();
          setIsOpen(inputName);
        }}>
        {selectedOption || placeholder}
      </div>
      {isOpen && (
        <ul className='options-list'>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired,
};

export default SearchInput;
