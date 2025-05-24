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

export type ServiceResponse<T> = { success: true; data: T } | { success: false; error: string };

export type Filters = {
  location: string;
  accommodationType: string;
  days: string;
  budget: string;
  safariType: string;
};

// export interface Tour {
//   id: string;
//   uniqueId: string;
//   title: string;
//   description: string;
//   location: string;
//   country: string;
//   images: TourImage[];
//   prices: TourPrice[];
//   safariType: string;
//   duration: number;
//   accommodation: string;
// }

export interface TourImage {
  image_urls: string;
}

export interface TourPrice {
  numOfPeople: number;
  pricePerPerson: number;
}

export interface Tour {
  id: number;
  uniqueId: number;
  title: string;
  description: string | null;
  location: string;
  country: string;
  durationInDays: number;
  itinerary: string | null;
  safariType: string | null;
  included: string | null;
  excluded: string | null;
  accommodationType: string | null;
  siteURL: string | null;
  rating: number | null;
  reviews: string | null;
  dateCreated: Date;
  dateModified: Date | null;
  archived: boolean;
  images: Image[];
  prices: Price[];
}

export interface Image {
  id: number;
  image_urls: string;
  dateCreated: Date;
  dateModified: Date | null;
  tourId: number;
}

export interface Price {
  id: number;
  numOfPeople: number;
  currency: string;
  pricePerPerson: number;
  seasonName: string;
  seasonPeriod: string;
  dateCreated: Date;
  dateModified: Date | null;
  tourId: number;
}

export interface SearchResponse {
  tours: Tour[];
  cursor: number | null;
}

export interface Message {
  text: string;
  type: 'success' | 'error';
}

export interface ApiError {
  statusCode: number;
  error?: string;
  message?: string;
}
