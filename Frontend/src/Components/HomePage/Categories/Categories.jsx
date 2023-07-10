import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import { ContextGlobal } from "../../utils/global.context";
import { useContext } from "react";
const Work = () => {

  const { state } = useContext(ContextGlobal);
  const {categories} = state
  const workInfoData = categories

  
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <h2 className="primary-subheading">¿Qué ofrecemos?</h2>
        <p className="primary-text">
          Somos una empresa de turismo que te recomienda los mejores lugares
          para disfrutar al máximo tus viajes.
        </p>
      </div>
   
      <div className="work-section-bottom">

      <div className="work-section-info">
            <Link to={`/productos`} className={`btn btn2 w-100`}>
            <div className="info-boxes-img-container">
              <img src="https://turistearte-img.s3.us-east-2.amazonaws.com/Fondo.jpg" alt="" />
            </div>
            </Link>
            <h3 className="work-section-title">Todos</h3>
      </div>

        {workInfoData.map((data, index) => (
          <div className="work-section-info" key={index}>
            <Link to={`/category/${data.id}`} className={`btn btn2 w-100`}>
            <div className="info-boxes-img-container">
              <img src={data.url_img} alt="" />
            </div>
            </Link>
            <h3 className="work-section-title">{data.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
