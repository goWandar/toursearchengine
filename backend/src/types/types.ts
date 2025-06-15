export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

export interface AuthenticatedUser {
  sub: string;
  email?: string;
  role: 'USER' | 'ADMIN';
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

export interface TourFilterInput {
  id?: number;
  uniqueId?: string;
  title?: string;
  description?: string | null;
  location?: string | null;
  countryId?: number | null;
  durationInDays?: number;
  itinerary?: string | null;
  accommodationType?: string | null;
  siteURL?: string | null;
  included?: string | null;
  excluded?: string | null;
  dateCreated?: Date | string;
  dateModified?: Date | string | null;
  archived?: boolean;
  operatorId?: number | null;
  daysMin?: number;
  daysMax?: number;
  priceMin?: number;
  priceMax?: number;
  safariType?: string;
}

export type PrismaTourFilters = {
  location?: {
    contains: string;
    mode: 'insensitive';
  };
  safariType?: {
    contains: string;
    mode: 'insensitive';
  };
  accommodationType?: {
    contains: string;
    mode: 'insensitive';
  };
  durationInDays?: {
    gte?: number;
    lte?: number;
  };
  prices?: {
    some: {
      pricePerPerson: {
        gte?: number;
        lte?: number;
      };
    };
  };
};

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

export type ServiceError = { success: false; error: string };

export type ServiceResponse<T> = { success: true; data: T } | ServiceError;
