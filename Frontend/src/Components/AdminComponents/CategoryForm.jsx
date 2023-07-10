import React, { useContext, useState } from "react";
import { useConfigHeaders } from "../utils/services/Apis/configHeader";
import { createCategory } from "../utils/services/Apis/CategoryApi";
import { ContextGlobal } from "../utils/global.context";
import "./Form.scss";

function CategoryForm() {
  const { dispatch } = useContext(ContextGlobal);

  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [imageCategory , setImageCategory] = useState([]);

  const onHandlerChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onChangeCategoryImage = (e) => setImageCategory(e.target.files);

  const config = useConfigHeaders();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: values.name,
      description: values.description,
    };

    const formData = new FormData();
    formData.append("category", JSON.stringify(body));
    formData.append("url_img", imageCategory[0]);

    console.log(imageCategory);

    try {
      const response = await createCategory(formData, config);
      if (response.status === 200) {
        dispatch({ type: "ADD_CATEGORY", payload: response.data });
      }
    } catch (error) {}
  };

  return (
    <>
      <h1 className="title-form">Agrega una nueva Categoria</h1>
      <div className="container-form">
        <form onSubmit={onHandleSubmit} className="tour-form">
          <div className="row">
            <div className="col-6">
              <label htmlFor="productName">Nombre de la categoria:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                id="productName"
                name="name"
                value={values.name}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productName">Descripcion:</label>
            </div>
            <div className="col-6">
            <textarea className="form-control" id="input2" rows="4" name='description' onChange={onHandlerChange}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productName">Imagen de la categoria:</label>
            </div>
            <div className="col-6">
            <input
                type="file"
                id="image"
                name="imageCategory"
                onChange={onChangeCategoryImage}
                accept=".jpg, .jpeg, .png"
                required
              />
            </div>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}

export default CategoryForm;
