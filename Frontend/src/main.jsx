import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Routes/Home/Home.jsx";
import Detail from "./Routes/ProductDetails/Datail.jsx"
import Admin from "./Routes/Admin.jsx";
import ContextProvider from "./Components/utils/global.context.jsx";
import Register from "./Routes/Register.jsx"
import LoginPage from "./Routes/LoginPage.jsx";
import ProductsPage from "./Routes/ProductsPages/ProductsPage.jsx"
import FilterCategory from "./Routes/ProductsPages/FilterCategory.jsx";
import Profile from "./Routes/Profile/Profile.jsx";
import EmailConfirmation from "./Routes/Email/EmailConfirmation.jsx";
import AdminProtected from "./Routes/ProtectedRoutes/AdminProtected.jsx";
import LoginAndRegister from "./Routes/ProtectedRoutes/LoginAndRegister.jsx";
import LoggedUser from "./Routes/ProtectedRoutes/LoggedUser.jsx";
import ErrorComponent from "./Routes/ErrorComponent/ErrorComponent.jsx";
import ReservationPage from "./Routes/Reservation/ReservationPage.jsx";
import Reservation from "./Routes/MyReservations/Reservation.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="product/:id" element={<Detail />} />
            <Route path="category/:id" element={<FilterCategory />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route element={<AdminProtected />}>
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route element={<LoginAndRegister />}>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route element={<LoggedUser />}>
              <Route path="perfil" element={<Profile />} />
              <Route path="/product/reservation/:id" element={<ReservationPage/>}/>
              <Route path="reservas" element={<Reservation />} />
            </Route>
            <Route path="error" element={<ErrorComponent />} />
            <Route path="*" element={<ErrorComponent />} />{" "}
            <Route path="EmailConfirmation" element={<EmailConfirmation />} />
            {/* En caso de ruta no existente, redirige al path principal*/}
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
