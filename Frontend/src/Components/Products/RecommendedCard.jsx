import React from "react";
import "./RecommendedCard.scss";

const RecommendedCard = ({ name, img }) => {
  return (
      <div className="section-bottom pb-5">
        
        <div
          className="section-info position-relative"
          style={{ backgroundImage: `url(${img})` }}>
          <h3 className="work-section-title position-absolute bottom-0">
            {name}
          </h3>
      </div>
    </div>
  );
};

export default RecommendedCard;
<marquee><a href="URL DE LA WEB" target="_blank"><img src="URL DEL BANNER" alt="NOMBRE DE LA WEB"/></a></marquee>