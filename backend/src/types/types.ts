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
  countryId: number;
  country?: Country;
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
  parksId:  Park['id'][];
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
  tours: Tour[];
}

export interface Park {
  id: number;
  name: string;
  countryId: number;
  country: Country | null;
  dateCreated: Date;
  dateModified: Date | null;
  toursId: Tour['id'][];
}

export interface Operator {
  id: number;
  name: string;
  dateCreated: Date;
  dateModified: Date | null;
  tours: Tour[]
}

export type ServiceError = { success: false; error: string };

export type ServiceResponse<T> = { success: true; data: T } | ServiceError;
