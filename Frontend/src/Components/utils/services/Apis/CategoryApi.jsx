import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:8080";

export async function getCategories() {
  const url = `/api/categories`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    throw error;
  }
}

export async function getCategoryById(id) {
  const url = `/api/categories/${id}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la categoria:", error);
    throw error;
  }
}

export async function getProductsByCategory(id) {
  const url = `/api/categories/${id}/products`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCategoryByID(id, config) {
  const url = `/api/categories/${id}`;
  Swal.fire({
    title: "Procesando solicitud",
    text: "Por favor, espere un momento...",
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.delete(url, config);
    Swal.close();
    Swal.fire({text:"Se eliminó la categoría con éxito", icon:'success'});
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data
        ? error.response.data
        : error.message;
    Swal.close();
    Swal.fire({text:"Error al eliminar la categoría:", errorMessage, icon:'error'});
    throw error;
  }
}

export async function createCategory(body, config) {
  const url = `/api/categories`;
  Swal.fire({
    title: "Procesando solicitud",
    text: "Por favor, espere un momento...",
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await axios.post(url, body, config);
    Swal.close();
    Swal.fire({
      text: "Se registró la categoría con éxito",
      icon: "success",
    });
    return response;
  } catch (error) {
    Swal.close();
    Swal.fire("Error al registrar la categoría:", error.message);
    throw error;
  }
}
