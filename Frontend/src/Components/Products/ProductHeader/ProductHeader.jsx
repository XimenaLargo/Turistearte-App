import React from 'react'
import { useNavigate } from "react-router-dom";
import "../../../Routes/ProductDetails/Detail.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

  function ProductHeader({title=false, productName = false, category = false}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
      };
    

    return (
        <div className={productName ? ("detail-container-header"): ("detail-container-header-2")}>
        {title&&<h1>{title}</h1>}
          {(productName && category) && <h2 className="product-title">{productName} - {category}</h2>}
          {(productName && !category) &&<h2 className="product-title">{productName}</h2>}
          <button className="back-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
      </div>    )
  }


export default ProductHeader