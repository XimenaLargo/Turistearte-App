import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Components/GeneralComponents/Spinner/Spinner";
import { getProductById } from "../../Components/utils/services/Apis/ProductApi";
import { ContextGlobal } from "../../Components/utils/global.context";
import SectionTitle from "../../Components/GeneralComponents/SectionTitle/SectionTitle";
import ProductHeader from "../../Components/Products/ProductHeader/ProductHeader";
import CalendarComponent from "../../Components/Calendar/Calendar.jsx";
import "./ReservationPage.scss";
import { createReservetion } from "../../Components/utils/services/Apis/ReservationApi";
import Swal from "sweetalert2";

const ReservationPage = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useContext(ContextGlobal);
  const { currentUser } = state;
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    reservation_date: "",
    phone_number: "",
    total_amount: product?.cost,
    dni: "",
    state: "state",
    account: { id: currentUser?.id },
    product: {
      idproduct: product?.id,
    },
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePayloadChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const getProduct = async () => {
    try {
      const res = await getProductById(params.id);
      setProduct(res);
      setLoading(false);
    } catch {}
  };

  const onlyNumbers = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const removeSpecialCharacters = (value) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    const sanitizedValue = value.replace(regex, '');
    return sanitizedValue;
  };
  const handleOnSubmit = async (e) => {
    e.preventDefaul;

    if(!payload.dni || !payload.phone_number  ||!selectedDate){
      Swal.fire("Por favor completar los datos obligarios")
    }else{
    const tempDNI= removeSpecialCharacters(payload.dni);
    const tempPhone_numer= removeSpecialCharacters(payload.phone_number)
    const updatedPayload = {
      ...payload,
      product: { idproduct: product.id },
      total_amount: product.cost,
      reservation_date: selectedDate.toISOString().split("T")[0],
      dni: parseInt(tempDNI),
      phone_number: parseInt(tempPhone_numer),
    };

    try {
      const res = await createReservetion(updatedPayload);
      navigate(-1);
    } catch (e) {}}
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const dateParam = searchParams.get("date");
    const dateParts = dateParam.split("-");
    const parsedDate =
      dateParts.length === 3
        ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
        : null;
    getProduct();
    setSelectedDate(parsedDate);
    setPayload({
      ...payload,
      reservation_date: dateParam,
      product: {
        idproduct: product?.id,
      },
      total_amount: product?.cost,
    });
  }, [location.search, params.id]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="ta-reservation-page">
            <ProductHeader
              productName={`Confirmá tu reserva para: ${product.name}`}
            />
            <div className="content-reservationPage">
              <section className="ta-form">
                <SectionTitle underline>Datos de tu reserva</SectionTitle>
                <form className="ta-card-form ta-card-form-container">
                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label">Nombre</label>
                    <input
                      type="text"
                      defaultValue={currentUser.name}
                      readOnly
                    />
                  </div>
                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label">Apellido</label>
                    <input
                      type="text"
                      defaultValue={currentUser.surname}
                      readOnly
                    />
                  </div>
                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label">Email </label>
                    <div className="ta-card-form-email">
                      <input
                        ype="text"
                        defaultValue={currentUser.email}
                        readOnly
                      />
                      <span className="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                    </div>
                  </div>

                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label"><span className="required">*</span> DNI</label>
                    <input
                      type="text"
                      placeholder="Ingrese su número de documento"
                      onKeyPress={onlyNumbers}
                      value={payload.dni}
                      onChange={handlePayloadChange}
                      name="dni"
                      id="dni"
                      required
                    />
                  </div>
                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label"><span className="required">*</span> Teléfono</label>
                    <input
                      type="text"
                      placeholder="Ingrese un teléfono de contacto"
                      value={payload.phone_number}
                      onChange={handlePayloadChange}
                      name="phone_number"
                      id="phone_number"
                      onKeyPress={onlyNumbers}
                      required
                    />
                  </div>
                  <div className="ta-card-form-input">
                    <label className="ta-card-form-label">Fecha Seleccionada</label>
                    <input
                      type="text"
                      placeholder="Seleccioná una fecha en el calendario"
                      value={
                        selectedDate
                          ? selectedDate.toISOString().split("T")[0]
                          : selectedDate
                      }
                      readOnly
                    />
                  </div>
                </form>
              </section>
              <section className="ta-reservation-date">
                <SectionTitle underline>Confirmá tu fecha:</SectionTitle>
                <CalendarComponent
                  productId={product?.id}
                  dateSelected={selectedDate}
                  onDateChange={handleDateChange}
                />
              </section>

              <section className="ta-tour-overview">
                <SectionTitle underline>
                  Datos de la aventura elegida:
                </SectionTitle>
                <form className="ta-card-form">
                  <div className="top">
                    <img src={product.url_img.at(0)?.url_img ?? ""} alt="" />
                  </div>
                  <div className="details">
                    <p>{product.category.name}</p>
                    <h3>{product.name}</h3>
                    <div className="description">
                      <p>{product.address}</p>
                      <p>${product.cost}</p>
                      <p>{product.description}</p>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            <div className="bottom">
              <button
                type="submit"
                onClick={handleOnSubmit}
                className={
                  !payload.dni || !payload.phone_number  ||!selectedDate? "button-disabled" : ""
                }

                title={
                  !payload.dni || !payload.phone_number || !selectedDate
                    ? "Por favor complete su DNI, su telefono y fecha para continuar"
                    : "Confirme su reserva aquí"
                }
              >
                Confirmar reserva
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReservationPage;
