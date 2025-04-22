import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getTours() {
  const response = await axios.get(`${baseUrl}/api/tours`);
  return response.data;
}

export async function searchToursAPI(url) {
  const response = await axios.get(url);

  //TODO manage error here ?
  return response.data;
}
