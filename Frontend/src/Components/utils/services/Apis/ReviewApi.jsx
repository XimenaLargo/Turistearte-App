import axios from "axios";
import Swal from "sweetalert2";
axios.defaults.baseURL = "http://localhost:8080";

export async function createReview(body){
    const url = `/api/reviews`;
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
        const response = await axios.post(url, body);
        Swal.close();
        Swal.fire({text:"Se registró su reseña de nuestro tour", icon: "success"});
        return response.data;
      } catch (error) {
        const errorMessage = error.response && error.response.data ? error.response.data : error.message;
        Swal.close();
        Swal.fire({text:"Hubo un problema para registrar su reseña: " + errorMessage, icon:'error'});
        throw error;
      }
}

export async function getReviewAverageById(){
    const url = `/api/reviews`;

    try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        throw error;
      }
}