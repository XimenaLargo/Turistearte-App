import React from "react";
import Products from "./Productos";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../Components/GeneralComponents/Spinner/Spinner";
import { getProductsByCategory, getCategoryById } from "../../Components/utils/services/Apis/CategoryApi";

function FilterCategory({}) {
  const [product, setProduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [categoryName , setCategoryName] = useState()

  const getProduct = async () => {
    try {
      const res = await getProductsByCategory(params.id);
      setProduct(res);
      setLoading(false);
    } catch {}
  };
  
  const getCategoryName = async () =>{
    try{
      const res = await getCategoryById(params.id)
      setCategoryName(res.name)
    }
    catch{}
  }
  
  useEffect(() => {
    getProduct();
    getCategoryName();
  }, []);

  return (
    <>
      {loading ? <Spinner /> : <Products toursArray={product} filter={false} categoryName={categoryName}/>}
    </>
  );
}

export default FilterCategory;
