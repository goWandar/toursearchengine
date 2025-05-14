import axios from 'axios';
import type { Tour } from '@/types/index.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface SearchResponse {
  tours: Tour[];
  cursor: number | null;
}

export async function getTours(): Promise<Tour[]> {
  const response = await axios.get<Tour[]>(`${baseUrl}/api/tours`);
  return response.data;
}

export async function searchToursAPI(url: string): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(url);
  return response.data;
}
