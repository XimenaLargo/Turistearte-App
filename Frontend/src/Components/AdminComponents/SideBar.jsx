import React, { useState, useEffect, useRef } from "react";
import "./SideBar.scss";
import AdminView from "./AdminView";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUserSwitch , AiOutlineClose } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";

const SideBar = () => {
  const [component, setComponent] = useState("");
  const [menu, setMenu] = useState(false);
  const sidebarRef = useRef(null);


  const view = (e) => {
    setComponent(e.target.name);
  };

  const toggleMenuPage = () =>{
    if(menu){
      setMenu(!menu)
    }
  }
  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <>
     <div className="header-side-bar">
        <button onClick={toggleMenu} className="menu-buttom">
        {menu ? <AiOutlineClose /> : <AiOutlineHome />}
        </button>
      </div>
     <div className="sideBar">
     <aside className={`sidebarMenu ${menu ? "isActive" : "disabled"}`}>
          <nav>
            <ul className="nav-menu-items">
              <li className="list-items">
                <div className="menu_title menu_administracion"></div>
                <a
                  onClick={view}
                  className="menu-item shared-button is-active"
                  name="home"
                >
                  <AiOutlineHome />
                  Home{" "}
                </a>
              </li>

              <li>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="Roles"
                >
                  <AiOutlineUserSwitch />
                  Roles
                </a>
              </li>

              <li>
                <div className="menu_title menu_lista"></div>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="CrearCategory"
                >
                  <BiPencil /> Crear Categorias
                </a>
              </li>

              <li>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="category"
                >
                  <AiOutlineTag />
                  Lista Categorias
                </a>
              </li>

              <li>
                <div className="menu_title menu_tours"></div>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="crearTour"
                >
                  <BiPencil /> Crear Tours
                </a>
              </li>

              <li>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="tours"
                >
                  <BiCheckCircle />
                  Lista Tours
                </a>
              </li>

              <li>
                <div className="menu_title menu_city"></div>
                <a
                  className="menu-item shared-button is-active"
                  onClick={view}
                  name="city"
                >
                  <BiCheckCircle />
                  Ciudades
                </a>
              </li>
            </ul>
          </nav>
        </aside>
            <div onClick={toggleMenuPage}>
            <AdminView  component={component} />
            </div>
      </div>
    </>
  );
};

export default SideBar;