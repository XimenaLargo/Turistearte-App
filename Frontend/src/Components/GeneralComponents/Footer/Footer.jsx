import React from "react";
import  './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="left-block">
          <img src="../logo2.svg" alt="logo" />
          <div>
            <span>{new Date().getFullYear()}</span>
            <span>
              &copy; <span >Turistearte.</span> Todos los derechos reservados.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
