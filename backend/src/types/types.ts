export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

export interface AuthUser {
  id: string;
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

export type ServiceResponse<T> = { success: true; data: T } | { success: false; error: string };
