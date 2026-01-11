import { ExperienceDestinationType, ExperienceType, paginationType, ParkSearchType, SearchItemType, SortToursType, TourFiltersType, TourSearchResponse, ToursPricedByType } from '@/types/free-search.types';
import axiosClient from './axios-retry-client';

// Get Search Suggestions & Experiences(free-search.utils.ts)
export const getSearchItems = async (): Promise<SearchItemType> => {
    try {
        const response = await axiosClient.get(`/api/tours/search-items`);

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

// Get Tours by Experience ID(useTourStore.ts)
export const getToursByExperienceId = async (
    experienceId: number,
    paginationMeta: paginationType,
    filters: TourFiltersType,
    sortBy: SortToursType,
    pricedBy: ToursPricedByType,
    experienceDestination: ExperienceDestinationType
): Promise<TourSearchResponse> => {
    try {
        const response = await axiosClient.get<{ data: TourSearchResponse }>(
            `/api/tours/experience/${experienceId}`,
            {
                params: {
                    page: paginationMeta.page,
                    limit: paginationMeta.limit,
                    duration: filters.duration,
                    accommodation: filters.accommodation,
                    budget: filters.budget,
                    sortBy: sortBy,
                    persons: pricedBy.persons,
                    destinationId: experienceDestination.destinationId,
                    destinationType: experienceDestination.destinationType
                }
            }
        );

        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch tours by experience id');
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

// Get Experiences(free-search.utils.ts)
export const getExperiencesFromDB = async (): Promise<ExperienceType[]> => {
    try {
        const response = await axiosClient.get<{ data: { experiences: ExperienceType[] } }>(
            `/api/experiences`
        );

        return response.data.data.experiences;
    } catch (error) {
        throw new Error('Failed to fetch experiences from DB');
    }
}