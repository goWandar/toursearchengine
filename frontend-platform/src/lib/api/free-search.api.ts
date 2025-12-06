import { paginationType, ParksCountriesType, ParkSearchType, SortToursType, TourFiltersType, TourSearchResponse, ToursPricedByType } from '@/types/free-search.types';
import axiosClient from './axios-retry-client';

// Get All Parks and Countries Suggestions(free-search.utils.ts)
export const getParksAndCountries = async (): Promise<ParksCountriesType> => {
    try {
        const response = await axiosClient.get(`/api/tours/country-park/suggestions`);

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch parks and countries');
    }
}

// Get Tours by Country ID(useTourStore.ts)
export const getToursByCountryId = async (
    countryId: number,
    paginationMeta: paginationType,
    filters: TourFiltersType,
    sortBy: SortToursType,
    pricedBy: ToursPricedByType
): Promise<TourSearchResponse> => {
    try {
        const response = await axiosClient.get<{ data: TourSearchResponse }>(
            `/api/tours/country/${countryId}`,
            {
                params: {
                    page: paginationMeta.page,
                    limit: paginationMeta.limit,
                    duration: filters.duration,
                    accommodation: filters.accommodation,
                    budget: filters.budget,
                    sortBy: sortBy,
                    persons: pricedBy.persons
                }
            }
        );

        return response.data.data;
    } catch (error: any) {
        throw new Error('Failed to fetch tours by country id');
    }
};

// Get Tours by Park ID(useTourStore.ts)
export const getToursByParkId = async (
    parkId: number,
    paginationMeta: paginationType,
    filters: TourFiltersType,
    sortBy: SortToursType,
    pricedBy: ToursPricedByType
): Promise<TourSearchResponse> => {
    try {
        const response = await axiosClient.get<{ data: TourSearchResponse }>(
            `/api/tours/park/${parkId}`,
            {
                params: {
                    page: paginationMeta.page,
                    limit: paginationMeta.limit,
                    duration: filters.duration,
                    accommodation: filters.accommodation,
                    budget: filters.budget,
                    sortBy: sortBy,
                    persons: pricedBy.persons
                }
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch tours by park id');
    }
}

// Get Parks By CountryName(free-search.utils.ts)
export const getParksByCountryName = async (
    countryName: string
): Promise<ParkSearchType[]> => {
    try {
        const response = await axiosClient.get<{ data: { parks: ParkSearchType[] } }>(
            `/api/parks/${countryName}`
        );

        return response.data.data.parks;
    } catch (error) {
        throw new Error('Failed to fetch parks by country name');
    }
}