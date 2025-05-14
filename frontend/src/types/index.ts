export * from './types';
import type { Tour } from './types';

export interface TourDetails extends Tour {
  itinerary: TourItinerary[];
  rating?: number;
  included?: string[];
  excluded?: string[];
}

export interface TourItinerary {
  day: number;
  title: string;
  description: string;
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface SubscribeFormData {
  email: string;
  name?: string;
  preferences?: string[];
}
