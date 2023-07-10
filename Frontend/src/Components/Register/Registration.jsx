import { useState, useContext } from "react";
import "./Register.scss";
import "../Login/Login.scss";
import { register } from "../utils/services/Apis/AuthenticationApi";
import { ContextGlobal } from "../utils/global.context";
import { Link, useNavigate } from "react-router-dom";
import EmailConfirmation from "../../Routes/Email/EmailConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Registration = () => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    secondPassword: "",
  });

  const [errorName, setErrorname] = useState("");
  const [errorSurname, setErrorSurname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorSecondPassword, setErrorSecondPassword] = useState("");
  const [show, setShow] = useState(false);
  const { dispatch } = useContext(ContextGlobal);
  const navigate = useNavigate();

  const onHandlerChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //Body de la api
  const body = {
    name: values.name,
    surname: values.surname,
    email: values.email,
    password: values.password,
    status: "ok",
  };

  //Validaciones
  const validateName = () => {
    if (!values.name.startsWith(" ") && values.name.length > 1) {
      return true;
    }
  };

  const validateSurname = () => {
    if (!values.surname.startsWith(" ") && values.surname.length > 1) {
      return true;
    }
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      return true;
    }
    return false;
  };

  const validatePassword = () => {
    if ( !values.password.startsWith(" ") && values.password.length >= 8 && /[A-Z]/.test(values.password)) {
      return true;
    }
  };

  const validateSecondPassword = () => {
    if (values.secondPassword == values.password) {
      return true;
    }
  };

  //Creación de un nuevo usuario
  const onHandeSubmit = (e) => {
    e.preventDefault();

    const isValidateName = validateName();
    const isValidateSurname = validateSurname();
    const isValidateEmail = validateEmail();
    const isValidatePassword = validatePassword();
    const isValidateSecondPassword = validateSecondPassword();

    if (!isValidateName) {
      setErrorname("Nombre invalido, Ingreselo nuevamente");
    } else {
      setErrorname("");
      setShow(false);
    }

    if (!isValidateSurname) {
      setErrorSurname("Apellido invalido, Ingreselo nuevamente");
    } else {
      setErrorSurname("");
      setShow(false);
    }

    if (!isValidateEmail) {
      setErrorEmail("Email invalido, Ingreselo nuevamente");
    } else {
      setErrorEmail("");
      setShow(false);
    }

    if (!isValidatePassword) {
      setErrorPassword("Contraseña invalida, Ingresela nuevamente");
    } else {
      setErrorPassword("");
      setShow(false);
    }

    if (!isValidateSecondPassword) {
      setErrorSecondPassword("La contraseña no coincide");
    } else {
      setErrorSecondPassword("");
      setShow(false);
    }

    if (
      isValidateName &&
      isValidateSurname &&
      isValidateEmail &&
      isValidatePassword &&
      isValidateSecondPassword
    ) {
      register(body, navigate);
    }
  };

  return (
    <div className="register-bg">
      <div className="superContainer">
        <form className="form-register" onSubmit={onHandeSubmit}>
          <h2 className="ta-form-Registrar">Registrarse</h2>
          <div className="register-name-surname">
            <div className="register-name-surname-internal">
              <label className="input-register">Nombre</label>
              <input
                className="input-register"
                type="text"
                placeholder="Ingrese su nombre"
                value={values.name}
                name="name"
                onChange={onHandlerChange}
              />
              {errorName ? <div className="error">{errorName}</div> : null}
            </div>
            <div className="register-name-surname-internal">
              <label className="input-register">Apellido</label>
              <input
                className="input-register"
                type="text"
                placeholder="Ingrese su Apellido"
                value={values.surname}
                name="surname"
                onChange={onHandlerChange}
              />
              {errorSurname ? (
                <div className="error">{errorSurname}</div>
              ) : null}
            </div>
          </div>
          <div className="register-name-surname-internal-email">
            <label className="input-register">Email</label>
            <input
              className="input-register"
              type="text"
              placeholder="pepito@gmail.com"
              value={values.email}
              name="email"
              onChange={onHandlerChange}
            />
            {errorEmail ? <div className="error">{errorEmail}</div> : null}
          </div>
          <div className="register-name-surname">
            <div className="register-name-surname-internal">
              <label className="input-register">Contraseña</label>
              <input
                className="input-register"
                type="password"
                placeholder="Ingrese su Contraseña"
                value={values.password}
                name="password"
                onChange={onHandlerChange}
              />
              {errorPassword ? (
                <div className="error">{errorPassword}</div>
              ) : null}
              <p>Debe contener 8 caracteres como mínimo y una mayúscula</p>
            </div>

            <div className="register-name-surname-internal">
              <label className="input-register">
                Confirmacion de contraseña
              </label>
              <input
                className="input-register"
                type="password"
                placeholder="Ingrese su Contraseña"
                value={values.secondPassword}
                name="secondPassword"
                onChange={onHandlerChange}
              />
              {errorSecondPassword ? (
                <div className="error">{errorSecondPassword}</div>
              ) : null}
            </div>
          </div>
          <div></div>
          <button className="button-comenzar">Crear Cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
