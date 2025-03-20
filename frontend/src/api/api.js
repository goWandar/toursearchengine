import axios from "axios";

const baseUrl = import.meta.env.VITE_API_PATH;

export async function getTours() {
  const response = await axios.get(`${baseUrl}/api/tours`);
  return response.data;
}
