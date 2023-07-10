import React from "react";
import Feature from "../Feature/Feature";
import SectionTitle from "../../GeneralComponents/SectionTitle/SectionTitle";
import "./ProductFeature.scss"
const ProductFeature = ({ features }) => {
  return (
    <>
      {features && features.length > 0 && (
        <section className="ta-tour-features">
          <SectionTitle underline>¿Qué ofrece este lugar?</SectionTitle>
          <div className="ta-features-container">
            {features.map((feature) => (
              <Feature type={feature.name} key={feature.idcharacteristic} label={feature.name} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductFeature;
