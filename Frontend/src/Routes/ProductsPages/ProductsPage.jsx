import React from "react";
import { useContext, useState } from "react";
import { ContextGlobal } from "../../Components/utils/global.context";
import Products from "./Productos";
import Pagination from "../../Components/GeneralComponents/Pagination/Pagination";

function ProductsPage() {
  const { state } = useContext(ContextGlobal);

  const [productsPage, setProductsPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * productsPage;
  const firstIndex = lastIndex - productsPage;
  const totalProducts = state.tours.length;

  return (
    <>
      
      <Products
        toursArray={state.tours}
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        filter={true}
        categoryName={"Todos nuestros Tours"}
      />

      <div className="container-product">
        <Pagination
          productsPage={productsPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={totalProducts}
        />
      </div>
    </>
  );
}

export default ProductsPage;
