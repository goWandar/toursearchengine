import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import SearchResultsDisplay from './SearchResultsDisplay';
import '../../assets/_tourSearch.scss';

const mockTours = [
  // Kenya Tours
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Luxury Safari Extravaganza',
    price: 1200,
    location: 'Kenya',
    type: 'Luxury',
    duration: 12,
    accommodationType: 'lodge',
    places: ['Masai Mara', 'Amboseli', 'Tsavo West', 'Samburu'],
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Wildlife Explorer',
    price: 2800,
    location: 'Kenya',
    type: 'Mid-range',
    duration: 8,
    accommodationType: 'lodge',
    places: ['Masai Mara', 'Lake Nakuru', 'Amboseli'],
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Budget Safari Adventure',
    price: 1200,
    location: 'Kenya',
    type: 'Budget',
    duration: 5,
    accommodationType: 'camp',
    places: ['Masai Mara', 'Lake Naivasha'],
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Exclusive Wilderness Retreat',
    price: 7500,
    location: 'Kenya',
    type: 'Luxury',
    duration: 10,
    accommodationType: 'lodge',
    places: ['Lewa Wildlife Conservancy', 'Masai Mara', 'Meru National Park'],
  },

  // Tanzania Tours
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D',
    title: 'Tanzania Serengeti Luxury Safari',
    price: 6000,
    location: 'Tanzania',
    type: 'Luxury',
    duration: 11,
    accommodationType: 'lodge',
    places: ['Serengeti', 'Ngorongoro Crater', 'Tarangire', 'Lake Manyara'],
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D',
    title: 'Tanzania Classic Safari',
    price: 3200,
    location: 'Tanzania',
    type: 'Mid-range',
    duration: 7,
    accommodationType: 'camp',
    places: ['Serengeti', 'Ngorongoro Crater', 'Tarangire'],
  },
  {
    id: 7,
    image:
      'https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D',
    title: 'Tanzania Budget Explorer',
    price: 1500,
    location: 'Tanzania',
    type: 'Budget',
    duration: 6,
    accommodationType: 'camp',
    places: ['Serengeti', 'Ngorongoro Crater'],
  },

  // South Africa Tours
  {
    id: 8,
    image:
      'https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'South Africa Luxury Escape',
    price: 5800,
    location: 'South Africa',
    type: 'Luxury',
    duration: 14,
    accommodationType: 'lodge',
    places: ['Kruger National Park', 'Cape Town', 'Garden Route', 'Johannesburg'],
  },
  {
    id: 9,
    image:
      'https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'South Africa Diverse Discovery',
    price: 3500,
    location: 'South Africa',
    type: 'Mid-range',
    duration: 10,
    accommodationType: 'lodge',
    places: ['Kruger National Park', 'Cape Town', 'Durban'],
  },
  {
    id: 10,
    image:
      'https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'South Africa Budget Safari & City',
    price: 1800,
    location: 'South Africa',
    type: 'Budget',
    duration: 8,
    accommodationType: 'camp',
    places: ['Kruger National Park', 'Johannesburg', 'Soweto'],
  },

  // Botswana Tours
  {
    id: 11,
    image:
      'https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Botswana Delta & Desert Luxury',
    price: 7200,
    location: 'Botswana',
    type: 'Luxury',
    duration: 12,
    accommodationType: 'lodge',
    places: ['Okavango Delta', 'Chobe National Park', 'Kalahari Desert'],
  },
  {
    id: 12,
    image:
      'https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Botswana Wildlife Encounter',
    price: 4200,
    location: 'Botswana',
    type: 'Mid-range',
    duration: 9,
    accommodationType: 'camp',
    places: ['Okavango Delta', 'Moremi Game Reserve', 'Chobe National Park'],
  },
  {
    id: 13,
    image:
      'https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Botswana Budget Safari Adventure',
    price: 2200,
    location: 'Botswana',
    type: 'Budget',
    duration: 7,
    accommodationType: 'camp',
    places: ['Okavango Delta', 'Chobe National Park'],
  },

  // Additional tours with varied durations and prices
  {
    id: 14,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Savannah Short Escape',
    price: 1600,
    location: 'Kenya',
    type: 'Mid-range',
    duration: 4,
    accommodationType: 'lodge',
    places: ['Masai Mara', 'Lake Nakuru'],
  },
  {
    id: 15,
    image:
      'https://images.unsplash.com/photo-1598975314523-9afadd6316c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D',
    title: 'Tanzania Exclusive Wilderness',
    price: 8500,
    location: 'Tanzania',
    type: 'Luxury',
    duration: 15,
    accommodationType: 'lodge',
    places: ['Serengeti', 'Ngorongoro Crater', 'Ruaha', 'Selous'],
  },
  {
    id: 16,
    image:
      'https://plus.unsplash.com/premium_photo-1664304310991-b43610000fc2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'South Africa Quick Safari',
    price: 900,
    location: 'South Africa',
    type: 'Budget',
    duration: 3,
    accommodationType: 'camp',
    places: ['Pilanesberg National Park'],
  },
  {
    id: 17,
    image:
      'https://images.unsplash.com/photo-1503889678302-211ae988b095?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Botswana Extended Explorer',
    price: 5500,
    location: 'Botswana',
    type: 'Mid-range',
    duration: 14,
    accommodationType: 'lodge',
    places: ['Okavango Delta', 'Chobe National Park', 'Makgadikgadi Pans', 'Central Kalahari'],
  },
  {
    id: 18,
    image:
      'https://images.unsplash.com/photo-1477949775154-d739b82400b3?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Kenya Ultimate Luxury',
    price: 1000,
    location: 'Kenya',
    type: 'Luxury',
    duration: 13,
    accommodationType: 'lodge',
    places: ['Amboseli'],
  },
];

const TourSearch = () => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [openInput, setOpenInput] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (!event.target.closest('.search-input')) {
        setOpenInput(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsSearchEnabled(!!location);
  }, [location]);

  const parseDaysFilter = daysFilter => {
    if (!daysFilter || daysFilter === 'Any') return { min: 0, max: Infinity };
    const [min, max] = daysFilter.split('-').map(s => {
      const num = parseInt(s.replace(/\D/g, ''));
      return isNaN(num) ? Infinity : num;
    });
    return { min, max: max || Infinity };
  };

  const parseBudgetFilter = budgetFilter => {
    if (!budgetFilter) return { min: 0, max: Infinity };
    const numbers = budgetFilter.match(/\d+/g).map(Number);
    const min = numbers[0] || 0;
    const max = numbers[1] || Infinity;
    return { min, max };
  };

  const handleSearch = () => {
    setHasSearched(true);
    const daysFilter = parseDaysFilter(days);
    const budgetFilter = parseBudgetFilter(budget);

    const filteredResults = mockTours.filter(tour => {
      const matchesLocation =
        location === 'Anywhere' || !location || tour.location.toLowerCase() === location.toLowerCase();
      const matchesType = !type || tour.type.toLowerCase() === type.toLowerCase();
      const matchesDays = days === 'Any' || (tour.duration >= daysFilter.min && tour.duration <= daysFilter.max);
      const matchesBudget = tour.price >= budgetFilter.min && tour.price <= budgetFilter.max;
      const matchesAccommodation = !selectedOption || tour.accommodationType === selectedOption;

      return matchesLocation && matchesType && matchesDays && matchesBudget && matchesAccommodation;
    });

    setSearchResults(filteredResults);
  };

  const daysOptions = ['Any', '1 - 5', '6 - 10', '10 - 15', '15+'];

  const handleDaysSelect = selectedDays => {
    setDays(selectedDays);
    setOpenInput(null);
  };

  const handleOptionChange = option => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  const handleBookNow = tourId => {
    console.log('Booking tour:', tourId);
    // Add booking logic here
  };

  const handleLocationSelect = selectedLocation => {
    setLocation(selectedLocation);
  };

  return (
    <div className='tour-search-container'>
      <nav className='tour-search-navbar'>
        <Link
          to='/'
          className='home-button'>
          Back to Home
        </Link>
      </nav>
      <div className='tour-search-content'>
        <h1>Tour Search</h1>
        <div className='search-inputs-row'>
          <SearchInput
            placeholder='Where to'
            options={['Anywhere', 'Kenya', 'Tanzania', 'South Africa', 'Botswana']}
            onSelect={handleLocationSelect}
            isOpen={openInput === 'location'}
            setIsOpen={setOpenInput}
            inputName='location'
          />
          <SearchInput
            placeholder='Type'
            options={['Luxury', 'Mid-range', 'Budget']}
            onSelect={setType}
            isOpen={openInput === 'type'}
            setIsOpen={setOpenInput}
            inputName='type'
          />
          <div className={`days-input-container search-input`}>
            <div
              className={`input-container ${!days ? 'placeholder' : ''}`}
              onClick={() => setOpenInput('days')}>
              {days || 'Days'}
            </div>
            {openInput === 'days' && (
              <ul className='options-list'>
                {daysOptions.map(option => (
                  <li
                    key={option}
                    onClick={() => handleDaysSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <SearchInput
            placeholder='Budget'
            options={['0 - $499', '$500 - $1499', '$1500 - $2999', '$3000 - $4999', '$5000+']}
            onSelect={setBudget}
            isOpen={openInput === 'budget'}
            setIsOpen={setOpenInput}
            inputName='budget'
          />
          <button
            className='search-button'
            onClick={handleSearch}
            disabled={!isSearchEnabled}>
            Search
          </button>
        </div>
        <div className='checkboxes-row'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedOption === 'lodge'}
              onChange={() => handleOptionChange('lodge')}
            />
            Lodge
          </label>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={selectedOption === 'camp'}
              onChange={() => handleOptionChange('camp')}
            />
            Camp
          </label>
        </div>

        <SearchResultsDisplay
          results={searchResults}
          onBookNow={handleBookNow}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
};

export default TourSearch;
