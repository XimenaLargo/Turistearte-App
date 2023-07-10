import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextGlobal } from "../utils/global.context";
import { login, userInfo } from "../utils/services/Apis/AuthenticationApi";
import "./Login.scss";
import {decodeToken, setToken} from '../utils/services/Token'
import { setSessionStorage } from "../utils/services/Storage";
import Swal from "sweetalert2";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [show, setShow]= useState(false)

  const [errorPassword, setErrorPasswrord] = useState(false);
  const { dispatch , state} = useContext(ContextGlobal);
  const {currentUser} = state
  const navigate = useNavigate();


  const onChangeUserEmail = (e) => setUserEmail(e.target.value);
  const onChangeUserPassword = (e) => setUserPassword(e.target.value);

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
      return true;
    }
    return false;
  };
  const validatePassword = () => {
    if (!userPassword.startsWith(" ") && userPassword.length > 1) {
      return true;
    }
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();

    let validEmail = validateEmail();
    let validPassword = validatePassword();

    if (!validEmail) {
      setErrorEmail("Email invalido, Ingreselo nuevamente")
    } else {
      setErrorEmail("")
      setShow(false);
    }

    if(!validPassword){
      setErrorPasswrord("Contraseña Incorrecta")
    }else {
      setErrorPasswrord("")
      setShow(false);
    }

    if (validEmail && validPassword) {
      try {
        const token = await login({ email: userEmail, password: userPassword });
        token ? (setToken(token.token), dispatch({ type: "SET_AUTHENTICATION", payload: token.token })) : setToken("");
        const userDecoded = decodeToken().sub;
        let userInformation = {};
        if (userDecoded) {
          userInformation = await userInfo(userDecoded);
        }
        if (userInformation) {
          dispatch({ type: "GET_CURRENT_USER", payload: userInformation });
          setSessionStorage("CURRENT_USER_DETAILS", userInformation);
        }
        Swal.fire({
          icon: "success",
          title: "Inicio de sesión",
          text: "Ya estas conectado, ahora podes realizar tus reservas!"})
        navigate('/home');
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión. Por favor, inténtelo nuevamente.",
        });
      }
    }
  };
   ;
  return (
    <>
      <div className="login-body">
        
        <div className="login-container">
          <form className="form-login" >
            <h2 className="ta-form-title">Iniciar sesión</h2>
            <div>
            <label htmlFor="userEmail" className="inputs-login">
              Mail
            </label>
            <input
              className="inputs-login"
              type="text"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={onChangeUserEmail}
              required
            />
            {errorEmail ? <div className="error">{errorEmail}</div> : null}

            <label className="inputs-login" htmlFor="userPassword">
              Contraseña
            </label>
            <input
              className="inputs-login"
              type="password"
              id="userPassword"
              name="userPassword"
              value={userPassword}
              onChange={onChangeUserPassword}
              required
            />
            {errorPassword ? <div className="error">{errorPassword}</div> : null}
            </div>
            <button onClick={onSubmitLogin} className="button-comenzar">Comenzar</button>
            <Link className="link-registrarse" to="/Register"><button className="button-registrarse">Registrarse</button></Link>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
