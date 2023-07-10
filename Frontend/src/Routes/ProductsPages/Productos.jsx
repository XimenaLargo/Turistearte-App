import React, { useEffect, useState } from "react";
import Card from "../../Components/Products/CardProductDetail/Card";
import "./Products.scss";
import Filters from "./Filters.jsx";
import ProductHeader from "../../Components/Products/ProductHeader/ProductHeader";

export default function Products({ toursArray, firstIndex, lastIndex, filter , categoryName }) {

  return (
    <>
    <ProductHeader title={categoryName} />  
      <div className="section">
        <div className="left-section">
          <form className="form-product">
            <label>Destino</label>
            <input type="text" className="input" placeholder="Aventura" />
            <label>Check-in</label>
            <input type="text" className="input" placeholder="Fecha" />
            <input type="submit" className="btnSearch-product" value="Buscar" />
          </form>
          {filter && <Filters />}
        </div>
        <div className="right-section">
          {toursArray
            .map((product) => {
              const reviews = product.reviews || []; // Si no hay reseñas, establece un arreglo vacío

              const totalCalificaciones = reviews.length;
              let sumaCalificaciones = 0;

              reviews.forEach((review) => {
                sumaCalificaciones += review.stars;
              });

              const promedioCalificaciones =
                totalCalificaciones > 0 ? sumaCalificaciones / totalCalificaciones : 0;

              return (
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imgUrl={product.url_img[0].url_img}
                  features={product.characteristics}
                  rating={promedioCalificaciones}
                  category={product.category.name}
                />
              );
            })
            .slice(firstIndex, lastIndex)}
        </div>
      </div>
    </>
  );
}
