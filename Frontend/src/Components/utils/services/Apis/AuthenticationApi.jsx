import axios from "axios";
import Swal from 'sweetalert2';

axios.defaults.baseURL = "http://localhost:8080";

export async function login(body) {
  const url = `/api/auth/login`;

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function register(body, navigate) {
  const url = `/api/auth/register`;

  try {
    const response = await axios.post(url, body);
    Swal.fire(
      'Te registraste con Exito!!',
      'Recibiras un Email para validar tu cuenta',
    )
    navigate("/home");
    return response.data;
  } catch (error) {
    Swal.fire(
      '❌',
      'Hubo un Error, Intente nuevamente',
    )
    console.error("Error al hacer el registro:", error);
    throw error;
  }
}

export async function userInfo(email) {
  const url = `/api/users/${email}/avatar`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);
    throw error;
  }
}
