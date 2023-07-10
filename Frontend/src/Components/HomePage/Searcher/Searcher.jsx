import React from "react";
import "./Searcher.scss";
import "../../../Routes/Home/Home.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faMapPin } from "@fortawesome/free-solid-svg-icons";
import es from 'date-fns/locale/es';

const Buscador = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="home-banner-container">
      <h1 className="primary-heading">
        Encontrá los mejores lugares para visitar!
      </h1>
      <form className="buscador">
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faMapPin} width="40px" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder=" Busca tu aventura"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faCalendarDays} width="40px" />
          </span>

          <div className="form-control">
            <DatePicker
              showIcon
              selected={endDate}
              onChange={handleEndDateChange}
              className="form-select"
              placeholderText="Fecha de tu aventura"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              locale={es}
            />
          </div>
        </div>
        <div className="input-group input-group-btn mb-3 ">

        <input type="submit" className="btnSearch" value = "Buscar" />
        </div>

      </form>
    </div>
  );
};

export default Buscador;
