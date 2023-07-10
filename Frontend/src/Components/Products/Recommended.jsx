import React from "react";
import RandomProducts from "./RandomProducts.jsx";
import './RecommendedCard.scss'

export default function Recommended() {
  return (
    <>
      <h1 className="Card-section-top m-0">Nuestros recomendados</h1>
      <div className="section-bottom">
      <RandomProducts />
      </div>
    </>
  );
}
