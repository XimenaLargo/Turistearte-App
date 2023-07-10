import { Link } from "react-router-dom";
import "./Sidenav.scss";
import { useContext, useEffect, useState } from "react";
import { ContextGlobal } from "../../utils/global.context";
import {  AiOutlineClose } from "react-icons/ai";


export default function Sidenav({ close, click }) {
  const [isAdminUser,setIsAdminUser] = useState(false)
  const {state} =useContext(ContextGlobal)
  const {currentUser} =state

  
useEffect(()=>{
  currentUser.role == "ROLE_ADMIN" ? setIsAdminUser(true) :setIsAdminUser(false)
}, [currentUser])

  return (
    <div className="ta-side-panel">
      <div className="ta-side-panel-header">
        <div onClick={close}>
          <AiOutlineClose />
        </div>
        <h2>Menú</h2>
      </div>
      <div onClick={close} className="ta-side-panel-options">
        <Link to={"/perfil"}>
          <div className="ta-side-panel-options-item">Mi Perfil</div>
        </Link>
        <Link to={"/Reservas"}>
          <div className="ta-side-panel-options-item">Mis Reservas</div>
        </Link>
        {isAdminUser&&<Link to={"/admin"}>
        <div className="ta-side-panel-options-item">Administración</div>
        </Link>}
       

        <button className="NavButton" onClick={click}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
