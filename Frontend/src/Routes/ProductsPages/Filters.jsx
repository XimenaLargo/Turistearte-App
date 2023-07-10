import React from 'react'

function Filters() {
  return (
    <div className="filters">
    <h3 className="label">Categorias</h3>
    <ul>
      <div id="checkboxes">
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Culturales</label>{" "}
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Espectaculos</label>{" "}
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Aventura</label>{" "}
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Gastronómicos</label>{" "}
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Educativos</label>{" "}
        </li>
        <li>
          {" "}
          <input
            type="checkbox"
            name="categories"
          />{" "}
          <label>Exteriores</label>{" "}
        </li>
      </div>{" "}
    </ul>
  </div>
  )
}

export default Filters