import { CountrySearchType, ParkSearchType, TourSearchResponse } from '@/types/types';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:30001";


// Get All Parks
export const getAllParks = async (): Promise<ParkSearchType[]> => {
    try {
        console.log("Fetching all parks...");
        const response = await axios.get(`${baseUrl}/api/parks`);
        console.log("Parks fetched:", response.data);
        const parks = response.data
        return parks.data;
    } catch (error) {
        return [];
    }
}

// Get All Countries
export const getAllCountries = async (): Promise<CountrySearchType[]> => {
    try {
        const response = await axios.get(`${baseUrl}/api/countries`);
        const countries = response.data
        return countries.data;
    } catch (error) {
        return [];
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