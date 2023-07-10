import React, { useEffect, useState, useContext } from "react";
import { ContextGlobal } from "../../Components/utils/global.context";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Reservation.scss";
import { getReservetionsByAccount } from "../../Components/utils/services/Apis/ReservationApi";
import { deleteReservetionById } from "../../Components/utils/services/Apis/ReservationApi";
import Swal from "sweetalert2";

function Reservation() {
  const {
    state: { currentUser },
  } = useContext(ContextGlobal);
  const [reservations, setReservations] = useState([]);

  async function listResevations() {
    const response = await getReservetionsByAccount(currentUser.id);
    setReservations(response);
  }

  const deleteReservation = async (id) => {
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
    }
    let confirmDelete = await confirmAction()
    if (confirmDelete) {
      try {
        await deleteReservetionById(id);
        listResevations(); // Actualizar la lista de reservas después de eliminar una reserva
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    listResevations();
  }, []);

  return (
    <div className="container">
      <h4 className="tittle-reservations">Mis Reservas</h4>
      <table className="table table-sm">
        <thead className="tableData">
          <tr>
            <th scope="col"># reserva</th>
            <th scope="col">Nombre del Tour</th>
            <th scope="col">Fecha de Tour</th>
            <th scope="col">Cancelacion</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <th scope="row">{reservation.id}</th>
              <td>{reservation?.tour.name}</td>
              <td>{reservation.reservation_date}</td>
              <td className="Bar-close">
                <AiFillCloseCircle
                  onClick={() => deleteReservation(reservation.id)} // Agregar el evento onClick para eliminar la reserva
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservation;
