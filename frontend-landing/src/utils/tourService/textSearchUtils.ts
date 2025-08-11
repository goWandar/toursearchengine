import { CountrySearchType, ParkSearchType } from "@/types";
import axios from "axios"

// Get All Parks Handler
export const getAllParks = async (): Promise<ParkSearchType[]> => {
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
export const getAllCountries = async (): Promise<CountrySearchType[]> => {
    try {
        const response = await axios.get("http://localhost:3000/api/countries");
        const countries = response.data
        return countries.data;
    } catch (error) {
        console.error("Error fetching parks:", error);
        return [];
    }
}

