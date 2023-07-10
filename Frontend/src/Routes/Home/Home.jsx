import React from "react";
import Buscador from "../../Components/HomePage/Searcher/Searcher.jsx";
import Categories from "../../Components/HomePage/Categories/Categories.jsx"
import  './Home.scss'
import Recommended from '../../Components/Products/Recommended.jsx'
const Home = () => {

  return (
    <main>
      <Buscador />
      <Categories/>
      <Recommended/>
    </main>
  );
};
export default Home;
