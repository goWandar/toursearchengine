import useSearchToursAPI from '@/hooks/useSearchToursAPI';
import useStore from '@/store/store';
import { createUrlwithFilter } from '@/utils/tourService/tourUtils';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/_tourSearch.scss';
import SearchInput from './SearchInput';
import SearchResultsDisplay from './SearchResultsDisplay';

/**
 * Main tour search component with filters and results display
 */
const TourSearch = () => {
  // State for search filters
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    days: '',
    budget: '',
    accommodationType: '',
    safariType: '',
  });

  const { tours, addTours, setTours, resetCursor } = useStore();

  // State for tracking which input dropdown is open
  const [openInput, setOpenInput] = useState<string | null>(null);

  // Flag to indicate if search has been performed
  const [hasSearched, setHasSearched] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [url, setUrl] = useState(createUrlwithFilter(filters, cursor));

  //Initialize tour service hook
  const { refetch, isLoading } = useSearchToursAPI(url);

  // Effect for handling clicks outside of open dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-input')) {
        setOpenInput(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  /**
   * Handles search button click
   * Fetches data if not already loaded, then filters results
   */
  const handleSearch = async () => {
    // Update URL state with current filters
    setUrl(createUrlwithFilter(filters, 0));
    const { data: response, isSuccess } = await refetch();

    if (isSuccess && response) {
      setTours(response.tours);
      if (response.cursor && response.cursor > 0) setCursor(response.cursor);
      setHasSearched(true);
    }
  };

  const queryClient = useQueryClient();

  const handleShowMore = async () => {
    const cursor = useStore.getState().cursor;
    const url = createUrlwithFilter(filters, cursor);

    // Update the query key to trigger a refetch with the new URL
    queryClient.setQueryData(['tours-with-filter', url], null);
    const { data: response, isSuccess } = await refetch();

    if (isSuccess && response) {
      addTours(response.tours);
      if (response.cursor !== null && response.cursor > 0) setCursor(response.cursor);
      setHasSearched(true);
    }
  };

  /**
   * Updates filter state when inputs change
   * @param {String} name - Filter name
   * @param {*} value - New filter value
   */
  const handleFilterChange = (name: string, value: string | number | null) => {
    if (value === 'Anywhere' || value === 'Any') {
      return;
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
    // NEW: Close dropdown after selecting an option
    setOpenInput(null);
    //reseting the cursor of pagination
    resetCursor();
  };

  // Handler for book now button clicks
  const handleBookNow = (tourId: any) => {
    console.log('Booking tour:', tourId);
    // TODO: Implement booking logic
  };

  // Options for days filter dropdown
  //TODO must address the 15+ this as the server doesnt accept it
  const daysOptions = ['Any', '1 - 5', '6 - 10', '10 - 15', '15+'];

  return (
    <div className='tour-search-container'>
      <nav className='tour-search-navbar'>
        <Link to='/' className='home-button'>
          Back to Home
        </Link>
      </nav>

      <div className='tour-search-content'>
        <h1>Tour Search</h1>
        {/* Search filters row */}
        <div className='search-inputs-row'>
          <SearchInput
            placeholder='Where to'
            options={['Anywhere', 'Kenya', 'Tanzania', 'South Africa', 'Botswana']}
            onSelect={(value: any) => handleFilterChange('location', value)}
            isOpen={openInput === 'location'}
            setIsOpen={(shouldOpen: any) => setOpenInput(shouldOpen ? 'location' : null)}
          />

          <SearchInput
            placeholder='Type'
            options={['Any', 'Luxury', 'Mid-range', 'Budget']}
            onSelect={(value: any) => handleFilterChange('type', value)}
            isOpen={openInput === 'type'}
            setIsOpen={(shouldOpen: any) => setOpenInput(shouldOpen ? 'type' : null)}
          />

          <SearchInput
            placeholder='Days'
            options={daysOptions}
            onSelect={(value: any) => handleFilterChange('days', value)}
            isOpen={openInput === 'days'}
            setIsOpen={(shouldOpen: any) => setOpenInput(shouldOpen ? 'days' : null)}
          />

          <SearchInput
            placeholder='Budget'
            options={[
              '0 - $499',
              '$500 - $1499',
              '$1500 - $2999',
              '$3000 - $4999',
              '$5000+', //TODO must address this as the server doesnt accept it
            ]}
            onSelect={(value: any) => handleFilterChange('budget', value)}
            isOpen={openInput === 'budget'}
            setIsOpen={(shouldOpen: any) => setOpenInput(shouldOpen ? 'budget' : null)}
          />

          <button className='search-button' onClick={handleSearch} disabled={isLoading}>
            Search
          </button>
        </div>
        {/* Accommodation type checkboxes */}
        <div className='checkboxes-row'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={filters.accommodationType === 'lodge'}
              onChange={() =>
                handleFilterChange(
                  'accommodationType',
                  filters.accommodationType === 'lodge' ? null : 'lodge',
                )
              }
            />
            Lodge
          </label>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={filters.accommodationType === 'camp'}
              onChange={() =>
                handleFilterChange(
                  'accommodationType',
                  filters.accommodationType === 'camp' ? null : 'camp',
                )
              }
            />
            Camp
          </label>
        </div>
        {/* Results display area */}
        <SearchResultsDisplay
          results={tours}
          onBookNow={handleBookNow}
          hasSearched={hasSearched}
          loading={isLoading}
          loadingMessage='Finding tours...'
        />
      </div>
      {tours && tours.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <button className='search-button' onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TourSearch;
