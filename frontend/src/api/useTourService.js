import { useState, useCallback } from 'react';
import { getTours } from './api';

/**
 * Custom hook for managing tour data and related operations
 */
const useTourService = () => {
  // State for storing tours data
  const [tours, setTours] = useState([]);
  // Loading state indicator
  const [loading, setLoading] = useState(false);
  // Error state for API failures
  const [error, setError] = useState(null);
  // Flag to track if data has been loaded
  const [hasLoaded, setHasLoaded] = useState(false);

  /**
   * Fetches tours data from API
   * @returns {Promise} Promise containing tours data
   */
  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      //TODO add proper type here
      const result = await getTours();

      // No need to flatten the trips anymore but error handing must be done properly here
      const flattenedTours = result.data.tours; //a
      setTours(flattenedTours);
      setHasLoaded(true);
      setError(null);
      return flattenedTours;
    } catch (err) {
      setError(err.message);
      setTours([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Selects a random image from tour's images array
   * @param {Array} images - Array of image objects
   * @param {String} fallbackImage - Default image if no images available
   * @returns {String} Image URL
   */
  const getRandomImage = (images, fallbackImage = 'https://moafrikatours.com/default.jpg') => {
    return images?.length > 0 ? images[Math.floor(Math.random() * images.length)].image_urls : fallbackImage;
  };

  /**
   * Gets price for single person from pricing array
   * @param {Array} prices - Array of price objects
   * @returns {String|Number} Formatted price or message
   */
  const getPrice = (prices) => {
    if (!prices?.length) return 'Price not available';
    const amountInfo = prices.find((info) => info.numOfPeople === 1);
    return amountInfo?.pricePerPerson ?? 'Price not available';
  };

  /**
   * Filters tours based on search criteria
   * @param {Array} tours - Tours to filter
   * @param {Object} filters - Search filters
   * @returns {Array} Filtered tours
   */
  const filterTours = (tours, filters) => {
    const { location, type, days, budget, accommodationType } = filters;

    const daysFilter = parseDaysFilter(days);
    const budgetFilter = parseBudgetFilter(budget);

    return tours.filter((tour) => {
      const matchesLocation =
        !location || location === 'Anywhere' || tour.country.toLowerCase() === location.toLowerCase();
      const matchesType = !type || tour.type.toLowerCase() === type.toLowerCase();
      const matchesDays =
        days === 'Any' || (tour.durationInDays >= daysFilter.min && tour.durationInDays <= daysFilter.max);
      const matchesBudget = tour.price >= budgetFilter.min && tour.price <= budgetFilter.max;
      const matchesAccommodation = !accommodationType || tour.accommodationType === accommodationType;

      return matchesLocation && matchesType && matchesDays && matchesBudget && matchesAccommodation;
    });
  };

  // Helper function to parse days filter string into min/max values
  const parseDaysFilter = (daysFilter) => {
    if (!daysFilter || daysFilter === 'Any') return { min: 0, max: Infinity };
    const [min, max] = daysFilter.split('-').map((s) => {
      const num = parseInt(s.replace(/\D/g, ''));
      return isNaN(num) ? Infinity : num;
    });
    return { min, max: max || Infinity };
  };

  // Helper function to parse budget filter string into min/max values
  const parseBudgetFilter = (budgetFilter) => {
    if (!budgetFilter) return { min: 0, max: Infinity };
    const numbers = budgetFilter.match(/\d+/g).map(Number);
    const min = numbers[0] || 0;
    const max = numbers[1] || Infinity;
    return { min, max };
  };

  return {
    tours,
    loading,
    error,
    fetchTours,
    hasLoaded,
    getRandomImage,
    getPrice,
    filterTours,
  };
};

export default useTourService;
