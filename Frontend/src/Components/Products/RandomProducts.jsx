import React from "react";
import CardRecomendados from "./RecommendedCard";
import { ContextGlobal } from "../utils/global.context";
import { useContext } from "react";
import { Link } from 'react-router-dom';

export default function RandomProducts() {
  const { state } = useContext(ContextGlobal);
  const { tours } = state
  const results = tours

  function randomProducts(array) {
    return Array.from(array).sort(() => Math.random() - 0.8);
  }

  const shuffledProducts = randomProducts(results);
  const first5Items = shuffledProducts.slice(0, 7);

  return (
    <>
          {first5Items.length &&
            first5Items.map((product) => (
              <Link key={product.id} to= {`/product/${product.id}`}><CardRecomendados key={product.id} name={product.name} img={product.url_img[0].url_img} /> </Link>// Agregar url de la imagen principal
            ))}
    </>
  );
}
