import { CountrySearchType, ParksCountriesType, ParkSearchType, TourSearchResponse } from '@/types/types';
import axios from 'axios';

const baseUrl = "http://localhost:3000";


// Get All Parks and Countries Suggestions
export const getParksAndCountries = async (): Promise<ParksCountriesType> => {
    try {
        const response = await axios.get(`${baseUrl}/api/tours/country-park/suggestions`);

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch parks and countries');
    }
}

// Get Tours by Country ID
export const getToursByCountryId = async (
    countryId: number,
    page = 1,
    limit = 10
): Promise<TourSearchResponse> => {
    try {
        const response = await axios.get<{ data: TourSearchResponse }>(
            `${baseUrl}/api/tours/country/${countryId}`,
            {
                params: { page, limit },
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch tours');
    }
};

// Get Tours by Park ID
export const getToursByParkId = async (
    parkId: number,
    page = 1,
    limit = 10
): Promise<TourSearchResponse> => {
    try {
        const response = await axios.get<{ data: TourSearchResponse }>(
            `${baseUrl}/api/tours/park/${parkId}`,
            {
                params: { page, limit },
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch tours');
    }
}