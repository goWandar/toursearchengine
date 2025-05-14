export type ServiceResponse<T> = { success: true; data: T } | { success: false; error: string };

export type Filters = {
  location: string;
  accommodationType: string;
  days: string;
  budget: string;
  safariType: string;
};

export interface Tour {
  id: string;
  uniqueId: string;
  title: string;
  description: string;
  location: string;
  country: string;
  images: TourImage[];
  prices: TourPrice[];
  safariType: string;
  duration: number;
  accommodation: string;
}

export interface TourImage {
  image_urls: string;
}

export interface TourPrice {
  numOfPeople: number;
  pricePerPerson: number;
}
