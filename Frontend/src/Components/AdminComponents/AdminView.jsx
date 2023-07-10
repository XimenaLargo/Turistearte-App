import React from "react";
import Form from "./Form";
import TourList from "./TourList";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import Roles from "./AdminRoles/Roles.jsx";
import "./AdminView.scss"
import CiudadesList from "./CitiesList";


function AdminView({ component }) {
  return (
    <div className="content-admin">
      {component === "crearTour" ? (
        <Form />
      ) : component === "tours" ? (
        <TourList />
      ) : component === "category" ? (
        <CategoryList />
      ) : component === "CrearCategory" ? (
        <CategoryForm />
        ) : component === "Roles" ? (
          <Roles/>
      ) :  component === "city" ? (
        <CiudadesList />
      ) : (
        <div className="Presentacioncontainer">
          <div className="intro">
            <p className="adminTitle">¡Bienvenido a AdminTuristearte!</p>
            <p className="adminText">
             Estamos felices que estes aqui, sentite libre de realizar lo que necesites :)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;
