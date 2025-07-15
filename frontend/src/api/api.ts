import type { SearchResponse, Tour } from '@/types/index';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_PATH || "http://localhost:3000";

export async function getTours(): Promise<Tour[]> {
  const response = await axios.get<Tour[]>(`${baseUrl}/api/tours`);
  return response.data;
}

export async function searchToursAPI(url: string): Promise<SearchResponse> {
  const response = await axios.get<SearchResponse>(url);
  return response.data;
}


// Subscribe to Waitlist
export async function subscribeToWaitlist(email: string): Promise<void> {
  try {
    await axios.post(`${baseUrl}/api/subscribers`, { email });
  } catch (error) {
    console.error("Error subscribing to waitlist:", error);
    throw error;
  }
}
