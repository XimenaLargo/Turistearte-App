import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import "./EmailConfirmation.scss"
import { Link } from "react-router-dom";


const EmailConfirmation = () => {
  return (
    <div className="container-email-confirmation">
      <div className="validContainer">
        <FontAwesomeIcon className="checkIcon" icon={faCircleCheck} />
        <h1 className="mensajeValido">Email validado con Exito!!!</h1>
      </div>
      <div className="textContainer">
        <h4>¡Gracias por confiar en Turistearte!</h4>
        <p>
          Turistearte te ofrece los mejores turismos que se ajusten a vos donde
          sea, cuando sea :)
        </p>
      </div>
      <div className="buttonValid">
       <Link to="/Home"> <button className="inicio">Volver al Inicio</button> </Link>
       <Link to="/Login"> <button className="iniciarSesion">Iniciar Sesion</button></Link>
      </div>
    </div>
      );
};

export default EmailConfirmation;
