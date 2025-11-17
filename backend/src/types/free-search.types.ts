import { Image, Price } from "./types.js";

// Tour Raw Interface (from DB)
export interface TourRaw {
    id: number;
    uniqueId: string;
    title: string;
    description: string | null;
    location: string | null;
    countryId: number;
    country: { id: number; name: string };
    operator: { id: number; name: string };
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
    tourParks: { park: { id: number; name: string } }[];
};

// Tour Return Type Interface (formatted for return)
export interface TourReturnType extends Omit<TourRaw, 'tourParks'> {
    parks: { id: number; name: string }[];
}