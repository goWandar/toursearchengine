import { ParksCountriesType, TourSearchResponse } from '@/types/types';
import axiosClient from '@/utils/axios-retry-client';

// Get All Parks and Countries Suggestions
export const getParksAndCountries = async (): Promise<ParksCountriesType> => {
    try {
        const response = await axiosClient.get(`/api/tours/country-park/suggestions`);

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
        const response = await axiosClient.get<{ data: TourSearchResponse }>(
            `/api/tours/country/${countryId}`,
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
        const response = await axiosClient.get<{ data: TourSearchResponse }>(
            `/api/tours/park/${parkId}`,
            {
                params: { page, limit },
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch tours');
    }
}