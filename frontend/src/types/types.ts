export interface User {
  name: string;
  email: string;
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
  accomodationType: string | null;
  siteURL: string | null;
  rating: number | null;
  reviews: number | null;
  dateCreated: Date;
  dateModified: Date;
  archived: boolean;
  images: Image[];
  prices: Price[];
}

export interface Image {
  id: number;
  image_urls: string;
  dateCreated: Date;
  dateModified: Date;
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
  dateModified: Date;
  tourId: number;
}

export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
