import React, { useState, useContext,useEffect } from "react";
import "./Form.scss";
import { ContextGlobal } from "../utils/global.context";
import { createProduct } from "../utils/services/Apis/ProductApi";
import Feature from "../Products/Feature/Feature";
import "../Login/Login.scss";
import Swal from "sweetalert2";
import { useConfigHeaders } from "../../Components/utils/services/Apis/configHeader";
import TourList from "./TourList";
import { getCities } from "../utils/services/Apis/CitiesApi";


export default function Form() {
  const [noProductCreated, setNoProductCreated] = useState(true);
  const [values, setValues] = useState({
    name: "",
    address: "",
    description: "",
    cost: 0,
    latitude: 0,
    longitude: 0

  });
  const [productCategory, setProductCategory] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [productCity, setProductCity] = useState ()
  const [productFeatures, setProductFeatures] = useState([]);
  const[cities, setCities] =useState([])
  const {
    state: { categories, features },
    dispatch,
  } = useContext(ContextGlobal);
  const config = useConfigHeaders();
  
  
  const onHandlerChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onchangeProductCity= (e) => setProductCity(e.target.value);
  const onchangeProductCategory = (e) => setProductCategory(e.target.value);
  const onChangeproductImages = (e) => setProductImages(e.target.files);
  const onChangeProductFeatures = (e) => {
    const featureId = parseInt(e.target.value);
    if (
      !productFeatures.find((feature) => feature.idcharacteristic === featureId)
    ) {
      setProductFeatures([...productFeatures, { idcharacteristic: featureId }]);
    } else {
      setProductFeatures(
        productFeatures.filter(
          (feature) => feature.idcharacteristic !== featureId
        )
      );
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const productData = {
      name: values.name,
      description: values.description,
      cost: values.cost,
      address: values.address,
      latitude: values.latitude,
      longitude: values.longitude,
      city: {
        id: productCity
      },
      category: { idcategory: parseInt(productCategory) },
      characteristics: productFeatures, // A espera de que se traigan las features desde la db
    };
    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));

    for (let i = 0; i < productImages.length; i++) {
      formData.append("url_img", productImages[i]);
    }
    if (productImages.length < 5) {
      Swal.fire("❌", "Por favor, cargue al menos 5 imágenes.");
      return;
    } else {
      try {
        const response = await createProduct(formData, config);
        if (response.status === 200) {
          dispatch({ type: "ADD_TOUR", payload: response.data });
          setNoProductCreated(false)
        }
      } catch (error) {}
    }
  };

const callCityApi = async () =>{
  try {
    const res = await getCities()
    setCities(res)
    } catch{}

}

  useEffect(() => {
    setNoProductCreated(true);
    callCityApi()
  }, []);
  return (
    <>
    <h1 className="title-form">Agrega un nuevo Tour</h1>
    { noProductCreated ? <div className="custom-component" >
      <div className="container-form container-form-tour">
        <form onSubmit={onSubmitForm} className="tour-form">
          <div className="row">
            <div className="col-6">
              <label htmlFor="productName">Nombre del Tour/Experiencia:</label>
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
              <label htmlFor="productAdress">Dirección:</label>
            </div>
            <div className="col-6">
              <input
                type="text"
                id="productAdress"
                name="address"
                value={values.address}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productDescription">Descripción:</label>
            </div>
            <div className="col-6">
              <textarea
                id="productDescription"
                name="description"
                value={values.description}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productImages">Imagenes:</label>
            </div>
            <div className="col-6">
              <input
                type="file"
                id="productImages"
                name="productImages"
                onChange={onChangeproductImages}
                accept=".jpg, .jpeg, .png"
                multiple
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productCost">Costo:</label>
            </div>
            <div className="col-6">
              <input
                type="number"
                id="productCost"
                name="cost"
                min="0"
                step="any"
                value={values.cost}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="custom-legend">Categoría del Tour</label>
            </div>
            <div className="col-6">
              <select
                id="category-dropdown"
                name="category"
                value={productCategory}
                onChange={onchangeProductCategory}
                required
              >
                <option value="">Seleccione una categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="custom-legend">Ciudad del Tour</label>
            </div>
            <div className="col-6">
              <select
                id="category-dropdown"
                name="category"
                value={productCity}
                onChange={onchangeProductCity}
                required
              >
                <option value="">Seleccione una ciudad</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productCost">Latitud:</label>
            </div>
            <div className="col-6">
              <input
                type="number"
                id="productLatitude"
                name="latitude"
                step="any"
                value={values.latitude}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="productCost">Longitud:</label>
            </div>
            <div className="col-6">
              <input
                type="number"
                id="productLongitude"
                name="longitude"
                step="any"
                value={values.longitude}
                onChange={onHandlerChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="productFeatures">Características:</label>
            </div>
            <div className="col-75-2">
              {features.map((feature) => (
                <div className="featurelist-div" key={feature.idcharacteristic}>
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    id={`feature-${feature.idcharacteristic}`}
                    name="productFeatures"
                    value={feature.idcharacteristic}
                    checked={productFeatures.some(
                      (featureObj) =>
                        featureObj.idcharacteristic === feature.idcharacteristic
                    )}
                    onChange={onChangeProductFeatures}
                  />
                  <Feature
                    key={feature.idcharacteristic}
                    type={feature.name}
                    label={feature.name}
                  />
                </div>
              ))}
            </div>
          </div>

  
          <div className="row">
            <button className="button-comenzar-form col-50" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div> : <TourList/>}
    </>
  );
}
