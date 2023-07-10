import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export async function getFeatures() {
  const url = `/api/characteristics`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las caracteristicas:", error);
    throw error;
  }
}
