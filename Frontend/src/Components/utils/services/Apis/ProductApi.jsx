import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = "http://localhost:8080";


export async function getProducts() {
  const url = `/api/products`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
}

export async function getProductById(id) {
  const url = `/api/products/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductById(id) {
  const url = `/api/products/${id}`;
  Swal.fire({
    title: 'Procesando solicitud',
    text: 'Por favor, espere un momento...',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  axios
    .delete(url)
    .then(function (response) {
      Swal.close();
      Swal.fire({text:"Se eliminó el tour exitosamente",icon:'success'});
      return response;
    })
    .catch(function (error) {
      const errorMessage = error.response && error.response.data ? error.response.data : error.message;
      Swal.close();
      Swal.fire({text:"Hubo un problema para eliminar el tour: " + errorMessage, icon:'error'});      return error;
});
}

export async function createProduct(body, config) {
  const url = `/api/products`;
  Swal.fire({
    title: 'Procesando solicitud',
    text: 'Por favor, espere un momento...',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  
  try {
    const response = await axios.post(url, body, config);
    Swal.close();
    Swal.fire({text:"Se registró el nuevo tour exitosamente", icon: "success"});
    return response;
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data : error.message;
    Swal.close();
    Swal.fire({text:"Hubo un problema para crear el tour: " + errorMessage, icon:'error'});
    throw error;
  }
  
}