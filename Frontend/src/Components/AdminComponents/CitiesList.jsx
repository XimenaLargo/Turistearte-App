import React, { useEffect, useState } from "react";
import "./CitiesList.scss";
import { getCities } from "../utils/services/Apis/CitiesApi";
import { AiOutlineEdit } from "react-icons/ai";

const CiudadesList = () => {

  const [cities , setCities] = useState();

  async function listCities (){
    try{
      const response = await getCities();
      setCities(response);
    }
    catch{}
  }
  useEffect(()=> {
    listCities();
  },[])

  
  return (
    <div className="form-container">
      <h4>Ciudades</h4>
      <table className="table table-sm">
        <thead className="table-active">
          <tr>
            <th>Id</th>
            <th>Ciudad</th>
            <th>Editar</th>
          </tr>
          </thead>
          <tbody>
            {cities && cities.map((city)=>(
              <tr key={city.id}>
                <td>{city.id}</td>
                <td>{city.name}</td>
                <td>
                  <AiOutlineEdit type='button'/>
              </td>
              </tr>
            ))}
          </tbody>
        
      </table>
    </div>
  );
};

export default CiudadesList;
