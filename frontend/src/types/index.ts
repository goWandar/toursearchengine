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


export interface TourImage {
  image_urls: string;
}

export interface TourPrice {
  numOfPeople: number;
  pricePerPerson: number;
}

export interface Tour {
  id: number;
  uniqueId: string;
  title: string;
  description: string | null;
  location: string | null;
  countryId: number;
  country: Pick<Country, 'id' | 'name'>;
  durationInDays: number;
  itinerary: string | null;
  accommodationType: string | null;
  siteURL: string | null;
  included: string | null;
  excluded: string | null;
  dateCreated: Date;
  dateModified: Date | null;
  archived: boolean;
  images: Image[];
  prices: Price[];
  tourParks: {
    park: Pick<Park, 'id' | 'name'>
  }[];
  operatorId: Operator['id'];
  operator: Pick<Operator, 'id' | 'name'>;
}

export interface Image {
  id: number;
  imageUrls: string;
  dateCreated: Date;
  dateModified: Date | null;
  tourId: number;
  tourUniqueId: string;
}

export interface Price {
  id: number;
  numOfPeople: number;
  currency: string;
  pricePerPerson: number;
  seasonName: string | null;
  seasonPeriod: string | null;
  dateCreated: Date;
  dateModified: Date | null;
  tourId: number;
  tourUniqueId: string;
}

export interface Country {
  id: number;
  name: string;
  dateCreated: Date;
  dateModified: Date | null;
  tours: Pick<Tour, 'id' | 'title'>[];
}

export interface Park {
  id: number;
  name: string;
  type: string;
  country: string;
  countryCode: string;
  keyword: string;
  dateCreated: Date;
  dateModified: Date | null;
  tourParks: {
    tour: Pick<Tour, 'id' | 'title'>;
  }[];
}

export interface Operator {
  id: number;
  name: string;
  dateCreated: Date;
  dateModified: Date | null;
  tours: Tour[]
}

export interface TourSearchResponse {
  tours: Tour[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
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

// Free Text Related Types

export interface ParkSearchType {
  id: number;
  name: string;
  keyword: string;
  type: string;
}

export interface CountrySearchType {
  id: number;
  name: string;
  type: string;
}

export interface ParksCountries {
  parks: ParkSearchType[];
  countries:CountrySearchType[];
}
