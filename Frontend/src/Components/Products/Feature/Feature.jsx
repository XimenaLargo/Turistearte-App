import './Feature.scss'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils , faBus ,faUserTie, faVest, faHandHoldingMedical, faLanguage} from '@fortawesome/free-solid-svg-icons';

const Feature = ({ type, label = false }) => {
    return (
       <div className="ta-svg-container">
          <Svg type={type} />
          {label && <span className="label">{label}</span>}
       </div>
    );
 };
 
 const Svg = ({ type }) => {
    switch (type.toLowerCase()) {
       case 'comida':
          return  <FontAwesomeIcon icon={faUtensils} />;
       case 'transporte':
          return   <FontAwesomeIcon icon={faBus} />;
       case 'guia turistico':
          return  <FontAwesomeIcon icon={faUserTie} />;
       case 'equipamiento':
          return <FontAwesomeIcon icon={faVest} /> ;
       case 'asistencia médica':
          return <FontAwesomeIcon icon={faHandHoldingMedical} />;
       case 'traductor de idioma':
          return <FontAwesomeIcon icon={faLanguage} />;
       default:
          console.error('amenity type not found');
          return null;
    }
 };
 
 export default Feature;