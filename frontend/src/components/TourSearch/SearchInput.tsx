import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface SearchInputProps {
  placeholder?: string;
  options: string[];
  onSelect: (option: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  options,
  onSelect,
  isOpen,
  setIsOpen,
}) => {
  const [selectedOption, setSelectedOption] = useState('');

  /**
   * Handles option selection
   * @param {String} option - Selected option
   */
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close dropdown after selection
  };

  /**
   * Clears the selected option
   * @param {Event} e - Click event
   */
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dropdown from opening
    setSelectedOption('');
    onSelect('');
  };

  return (
    <div className='search-input'>
      <div
        className={`input-container ${!selectedOption ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown
      >
        {selectedOption || placeholder}
        {selectedOption && (
          <IoClose className='clear-icon' onClick={handleClear} aria-label='Clear selection' />
        )}
      </div>
      {isOpen && (
        <ul className='options-list'>
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
