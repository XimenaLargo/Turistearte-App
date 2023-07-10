import React, { createContext, useState, useEffect, useReducer } from "react";
import { decodeToken, getToken } from "./services/Token";
import {
  setSessionStorage,
  removeSessionStorage,
  getSessionStorage,
} from "./services/Storage";
import { getProducts } from "./services/Apis/ProductApi";
import { userInfo } from "../utils/services/Apis/AuthenticationApi";
import { getCategories } from "./services/Apis/CategoryApi";
import { getFeatures } from "./services/Apis/FeaturesApi";

export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_TOURS":
      return { ...state, tours: action.payload };
    case "DELETE_TOUR_BY_ID":
      return {
        ...state,
        tours: state.tours.filter((tour) => tour.id !== action.payload),
      };
    case "ADD_TOUR":
      const newTour = action.payload;
      return {
        ...state,
        tours: [...state.tours, newTour],
      };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_CATEGORY":
      const newCat = action.payload;
      return {
        ...state,
        categories: [...state.categories, newCat],
      };
      case "DELETE_CATEGORY_BY_ID":
        return {
          ...state,
          categories: state.categories.filter((category) => category.id !== action.payload),
        };
    case "GET_CURRENT_USER":
      return { ...state, currentUser: action.payload };
    case "ADD_USER":
      return { ...state, listUsers: action.payload };
    case "GET_TOURS_BY_CATEGORY":
      return { ...state, toursByCategory: action.payload };
    case "GET_AUTHENTICATION":
      return state.jwt;
    case "SET_AUTHENTICATION":
      return { ...state, jwt: action.payload };
    case "GET_FEATURES":
      return { ...state, features: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  tours: [],
  categories: [],
  toursByCategory: [],
  currentUser: null,
  listUsers: [],
  jwt: null,
  features: [],
};

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const userStorage = getSessionStorage("CURRENT_USER_DETAILS");
      const userJWT = getToken();
      if (userStorage) {
        dispatch({ type: "GET_CURRENT_USER", payload: userStorage });
      } else {
        dispatch({ type: "GET_CURRENT_USER", payload: null });
      }
      if (userJWT) {
        dispatch({ type: "SET_AUTHENTICATION", payload: userJWT });
      }
    };
    const fetchData = async () => {
      try {
        const listCategories = await getCategories();
        setCategoriesAndDispatch(listCategories, "GET_CATEGORIES");

        const listProduct = await getProducts();
        setToursAndDispatch(listProduct, "GET_TOURS");

        const listFeatures = await getFeatures();
        setFeaturesAndDispatch(listFeatures, "GET_FEATURES");

        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    const setCategoriesAndDispatch = (categories, actionType) => {
      if (categories) {
        dispatch({ type: actionType, payload: categories });
        setCategories(categories);
      } else {
        setCategories([]);
      }
    };

    const setToursAndDispatch = (tours, actionType) => {
      if (tours) {
        dispatch({ type: actionType, payload: tours });
        setTours(tours);
      } else {
        setTours([]);
      }
    };
    const setFeaturesAndDispatch = (features, actionType) => {
      if (features) {
        dispatch({ type: actionType, payload: features });
        setFeatures(Features);
      } else {
        setFeature([]);
      }
    };

    setTimeout(async () => {
      fetchUser();
      await fetchData();
      setLoading(false);
    }, 5000);
  }, []);

  const [tours, setTours] = useState([]);
  const [categories, setCategories] = useState([]);
  const [features, setFeature] = useState([]);
  return (
    <ContextGlobal.Provider value={{ state, dispatch, loading }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;
