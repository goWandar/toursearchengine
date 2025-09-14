// Tour Related Types
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

// Mordern Search Related Types
export interface ParkSearchType {
    id: number;
    name: string;
    keyword: string;
    type: string;
};

export interface CountrySearchType {
    id: number;
    name: string;
    type: string;
};

export interface ParksCountriesType {
    parks: ParkSearchType[];
    countries: CountrySearchType[];
};

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