import axios from "axios";
import { Tour } from "../types/types";

const baseUrl = import.meta.env.VITE_BASE_URL;

export interface GetToursResponse<T> {
  statusCode: number;
  message: string;
  data: T[];
}

export async function getTours(): Promise<GetToursResponse<Tour[]>> {
  const response = await axios.get(`${baseUrl}/api/tours`);
  return response.data;
}
