import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import Feature from "../Feature/Feature";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

const Card = ({ id, imgUrl, features, name, description, category, rating =false}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const textScore = (rating) => {
    let text =
      rating = 0 ? "Sin Reseña"
        : rating>= 0.1 && rating <= 1
        ? "Muy Malo"
        : rating >= 1.1 && rating <= 2
        ? "Malo"
        : rating >= 2.1 && rating <= 3
        ? "Regular"
        : rating >= 3.1 && rating <= 4
        ? "Bueno"
        :rating>= 4.1 && rating <= 5
        ? "Muy bueno"
        :"Sin Reseña"
    return text;
  };
  return (
    <div className={style.cardContainer}>
      <div className={style.tourImageContainer}>
        <FontAwesomeIcon
          onClick={handleAddFavorite}
          className={style.tourFavorite}
          icon={!isFavorite ? faHeartRegular : faHeart}
        />
        <img className={style.tourImage} src={imgUrl} alt={name} />
      </div>
      <div className={style.cardDetails}>
        <div className={style.row1}>
          <div className={style.tourInitialContainer}>
          <div className={style.tourCategoryContainer}>
              <p className={style.tourCategory}>{category}</p>
             {/* <FontAwesomeIcon className={style.tourStars} icon={faStar} /> */}
            </div>
            <h5 className={style.tourTitle}>{name}</h5>
            
          </div>
          <div className={style.tourScore}> {/**Logica para renderizar el rating*/}
            <span className={style.scoreNumber}>
              {rating && parseInt(rating) }
              <FontAwesomeIcon className={style.tourStars} icon={faStar} />
            </span>
           {/* <p className={style.scoreText}>{textScore(rating)}</p>*/}
         
          </div>
        </div>

        <div className={style.tourInformation}>
          {features && features.map((feature) => (
            <Feature key={feature.name} type={feature.name} />
          ))}
        </div>
        
        <p className={style.tourDescription}>{description}</p>
        <Link to={`/product/${id}`} className={`btn btn2 w-100`}>
          <input
            type="submit"
            className="btnSearch-product"
            value="ver detalle"
          />
        </Link>
      </div>
    </div>
  );
};

export default Card;
