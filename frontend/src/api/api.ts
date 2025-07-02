import type { CountrySearchType, ParkSearchType, TourSearchResponse} from '@/types/index';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

// export async function getTours(): Promise<Tour[]> {
//   const response = await axios.get<Tour[]>(`${baseUrl}/api/tours`);
//   return response.data;
// }

// export async function searchToursAPI(url: string): Promise<SearchResponse> {
//   const response = await axios.get<SearchResponse>(url);
//   return response.data;
// }

// Get All Parks Handler
export const getAllParks = async (): Promise<ParkSearchType[]> => {
  try {
      const response = await axios.get(`${baseUrl}/api/parks`);
      const parks = response.data
      return parks.data;
  } catch (error) {
      return [];
  }
}

// Get All Countries Handler
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