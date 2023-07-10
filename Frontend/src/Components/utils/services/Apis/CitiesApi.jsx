import axios from "axios";
import Swal from 'sweetalert2';

axios.defaults.baseURL = "http://localhost:8080";

export async function getCities() {
    const url = `/api/cities`;
  
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }