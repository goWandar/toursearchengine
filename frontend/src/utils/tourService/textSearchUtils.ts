import axios from "axios"

export interface Park {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: string;
}

// Get All Parks Handler
export const getAllParks = async (): Promise<Park[]> => {
    try {
        const response = await axios.get("http://localhost:3000/api/parks");
        const parks = response.data
        return parks.data;
    } catch (error) {
        console.error("Error fetching parks:", error);
        return [];
    }
}

// Get All Countries Handler
export const getAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get("http://localhost:3000/api/countries");
        const countries = response.data
        return countries.data;
    } catch (error) {
        console.error("Error fetching parks:", error);
        return [];
    }
}