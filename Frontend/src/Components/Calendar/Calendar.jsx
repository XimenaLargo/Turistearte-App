import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import "./Calendar.scss";
import { getReservationDates } from "../utils/services/Apis/ReservationApi";
import es from 'date-fns/locale/es';

const Calendar = ({ productId, onDateChange = false,dateSelected = false, labelNeeded=false }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservationDates, setReservationDates] = useState([]);
  const dateConverter = (array) => {
    if (Array.isArray(array)) {
      const invalidDates = array.map((date) => {
        const dateParts = date.split('-');
        const parsedDate = dateParts.length === 3 ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2]) : null;
        return parsedDate;
      });
      setReservationDates(invalidDates);
      return invalidDates;
    }
    return [];
    
  };


  const handleEndDateChange = (date) => {
    setSelectedDate(date);
    onDateChange&& onDateChange(date)
  };

  const fetchReservationDates = async () => {
    try {
      const dates = await getReservationDates(productId);
      dateConverter(dates);
    } catch (error) {
      console.error("Error fetching reservation dates:", error);
    }
  };

  useEffect(() => {
    fetchReservationDates();
    dateSelected&& setSelectedDate(dateSelected)
  }, [productId, dateSelected]);

  return (
    <>
    <div className="calendar-component">
     {labelNeeded&& <p>Seleccione la fecha en la que quiere reservar</p>}
      <DatePicker
        wrapperClassName="input-form"
        className="input-form-reservation"
        selected={selectedDate}
        onChange={handleEndDateChange}
        excludeDates={reservationDates}
        minDate={new Date()}
        inline
        locale={es}
      />
      </div>
    </>
  );
};

export default Calendar;
