import { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import { ContextGlobal } from "../utils/global.context";
import { useContext } from "react";
import { removeToken } from "../utils/services/Token";
import Avatar from "./Avatar/Avatar";
import { removeSessionStorage } from "../utils/services/Storage";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [CurrentUserLogin, setCurrentUserLogin] = useState();
  const { state, dispatch } = useContext(ContextGlobal);
  const { currentUser } = state;
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    currentUser ? setCurrentUserLogin(true) : setCurrentUserLogin(false);
  }, [currentUser]);

  useEffect(() => {
    setIsMenuOpen(false); // Cerrar el menú al cambiar de ruta
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    setCurrentUserLogin(!CurrentUserLogin);
    removeSessionStorage("CURRENT_USER_DETAILS");
    dispatch({ type: "GET_CURRENT_USER", payload: null });
    removeToken();
    navigate("/home");
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header__logo">
        <Link to="/home">
          <img src="../LOGO-Turistearte.png " alt="Logo" />
        </Link>
        <h1 className="header__logo-text">Explorá con arte</h1>
      </div>
      {!CurrentUserLogin ? (
        <>
          <div
            className={`header__buttons ${
              isMenuOpen ? "header__buttons--open" : "header__buttons--closed"
            }`}
          >
            <Link to="/Register">
              <button className="header__button header__button--create-account">
                Crear cuenta
              </button>
            </Link>
            <Link to="/Login">
              <button className="header__button header__button--login">
                Iniciar sesión
              </button>
            </Link>
          </div>
          <div className="header__menu" onClick={handleMenuClick}>
            <FaBars />
          </div>
        </>
      ) : (
        <Avatar
          name={currentUser.name}
          lastName={currentUser.surname}
          logOut={() => handleLogOut()}
        />
      )}
    </header>
  );
};

export default Header;
