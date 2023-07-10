import axios from "axios";
import Swal from "sweetalert2";


axios.defaults.baseURL = "http://localhost:8080";

export async function getReservationDates(id) {
  const url = `/api/reservations/reserved-dates/${id}`;
  axios;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getReservetionsByAccount(id){
  const url = `/api/reservations/historical/${id}`;
  axios;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }

}

export async function createReservetion(body){
  const url = `/api/reservations`;
  Swal.fire({
    title: 'Procesando solicitud',
    text: 'Por favor, espere un momento...',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  axios;
   try {
    const response = await axios.post(url, body);
    Swal.close();
    Swal.fire({text:"Felicidades! realizaste tu reserva exitosamente", icon: "success"});
    return response.data;
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data : error.message;
    Swal.close();
    Swal.fire({text:"Hubo un problema para realizar su reserva: " + errorMessage, icon:'error'});
    throw error;
  }

}

export async function deleteReservetionById(id){
  const url = `/api/reservations/${id}`;
  Swal.fire({
    title: 'Procesando solicitud',
    text: 'Por favor, espere un momento...',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  axios;
   try {
    const response = await axios.delete(url);
    Swal.close();
    Swal.fire({text:"Cancelaste tu reserva", icon: "success"});
    return response.data;
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data : error.message;
    Swal.close();
    Swal.fire({text:"Hubo un problema para cancelar tu reserva: " + errorMessage, icon:'error'});
    throw error;
  }

}
