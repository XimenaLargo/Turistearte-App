import React, { useContext, useState } from "react";
import { ContextGlobal } from "../utils/global.context";
import "./TourList.scss";
import { deleteProductById } from "../utils/services/Apis/ProductApi";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";


const TourList = () => {
const { state , dispatch } = useContext(ContextGlobal);
const { tours } = state
const results = tours


const handleDeleteTour = async (tourID) => {
  const confirmAction = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
  
    return result.isConfirmed;
  };
  let confirmDelete = await confirmAction();
  if (confirmDelete) {
    deleteProductById(tourID) 
    dispatch({ type: "DELETE_TOUR_BY_ID", payload: tourID });
  }
  };
      
  return (
    <div className="form-container">
      <h3>Tours</h3>
        <table className="table table-sm">
          <thead className="table-active">
            <tr>
              <th>Tour</th>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Direccion</th>
              <th>Eliminar</th>
            </tr>
          </thead>
            <tbody>
              {results.map((tour) => (
                <tr key={tour.id}>
                  <td>
                    <img src={tour.url_img[0].url_img} alt="" width="100px" />
                  </td>
                  <td>{tour.name}</td>
                  <td>{tour.cost}</td>
                  <td>{tour.address}</td>
                  <td>
                <BsTrash3Fill  type='button'onClick={() => handleDeleteTour(tour.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>     
    </div>
                  
  );           
}
export default TourList;