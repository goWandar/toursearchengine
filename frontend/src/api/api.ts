import type { CountrySearchType, ParkSearchType, SearchResponse, Tour } from '@/types/index';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export async function getTours(): Promise<Tour[]> {
  const response = await axios.get<Tour[]>(`${baseUrl}/api/tours`);
  return response.data;
}

export async function searchToursAPI(url: string): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(url);
  return response.data;
}

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