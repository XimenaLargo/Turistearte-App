import React from "react";
import { useContext } from "react";
import { ContextGlobal } from "../utils/global.context";
import "./Form.scss";
import { BsTrash3Fill } from "react-icons/bs";
import { deleteCategoryByID } from "../utils/services/Apis/CategoryApi";
import { useConfigHeaders } from "../utils/services/Apis/configHeader";
import Swal from "sweetalert2";

function CategoryList() {
  const { state, dispatch } = useContext(ContextGlobal);
  const { categories } = state;
  const results = categories;
  const config = useConfigHeaders();

  const handleDeleteCategory = async (categoryID) => {
    const confirmAction = async () => {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      });
    
      return result.isConfirmed;
    };
    let confirmDelete = await confirmAction();
    if (confirmDelete) {
    try {
      const response = await deleteCategoryByID(categoryID, config);
        dispatch({ type: "DELETE_CATEGORY_BY_ID", payload: categoryID });
    } catch (error) {
    }
  }}

  return (
    <div className="form-container"> {/* Cambiar <form> a <div> */}
      <h3>Categorias</h3>
      <table className="table table-sm">
        <thead className="table-active">
          <tr>
            <th>Nombre</th>
            <th>description</th>
            <th>Imagen</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {results.map((categorie) => (
            <tr key={categorie.id}>
              <td>{categorie.name}</td>
              <td>{categorie.description}</td>
              <td>
                <img src={categorie.url_img} alt="" width="200px" />
              </td>
              <td>
                
                  <BsTrash3Fill type='button'onClick={(e) => handleDeleteCategory(categorie.id, e)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
