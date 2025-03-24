import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Search input component with dropdown options
 * @param {Object} props - Component props
 * @param {String} props.placeholder - Input placeholder text
 * @param {Array} props.options - List of options to display
 * @param {Function} props.onSelect - Callback when option is selected
 * @param {Boolean} props.isOpen - Whether dropdown is open
 * @param {Function} props.setIsOpen - Function to control dropdown open state
 */
const SearchInput = ({ placeholder, options, onSelect, isOpen, setIsOpen }) => {
  const [selectedOption, setSelectedOption] = useState('');

  /**
   * Handles option selection
   * @param {String} option - Selected option
   */
  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className='search-input'>
      <div
        className={`input-container ${!selectedOption ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
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
};

export default SearchInput;
