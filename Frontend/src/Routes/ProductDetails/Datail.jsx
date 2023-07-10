import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./Detail.scss";
import ProductImage from "../../Components/Products/ProductImage/ProductImage";
import MyVerticallyCenteredModal from "../../Components/Products/ProductImage/MyVerticallyCenteredModal";
import ProductHeader from "../../Components/Products/ProductHeader/ProductHeader";
import ProductFeature from "../../Components/Products/ProductDetail/ProductFeature";
import ModalReview from "../../Components/Reviews/ModalReview";
import SectionTitle from "../../Components/GeneralComponents/SectionTitle/SectionTitle";
import { getProductById } from "../../Components/utils/services/Apis/ProductApi";
import { ContextGlobal } from "../../Components/utils/global.context";
import Spinner from "../../Components/GeneralComponents/Spinner/Spinner";
import CalendarComponent from "../../Components/Calendar/Calendar";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ProductRating from "../../Components/Products/CardProductDetail/ProductRating/ProductRating";
import CustomMaps from "../../Components/Maps/Maps";

const Detail = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowReview, setModalShowReview] = useState(false);
  const { state } = useContext(ContextGlobal);
  const { currentUser } = state;
  const [selectedDate, setSelectedDate] = useState();
  const [average, setAverage] = useState();

  const reviewAverage = () => {
    const reviews = product.reviews || [];
    const totalCalificaciones = reviews.length;
    let sumaCalificaciones = 0;
    reviews.forEach((review) => {
      sumaCalificaciones += review.stars;
    });
    let promedioCalificaciones =
      totalCalificaciones > 0 ? sumaCalificaciones / totalCalificaciones : 0;
    return promedioCalificaciones;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getProduct = async () => {
    try {
      const res = await getProductById(params.id);
      setProduct(res);
      setLoading(false);
      const productAverage = await reviewAverage();
      setAverage(productAverage);
    } catch {}
  };

  useEffect(() => {
    getProduct();
  }, [params, product]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="detail-container">
            <ProductHeader
              productName={product?.name}
              category={product?.category.name}
            />

            <div className="cardDetail-product">
              <div className="detail-location">
                <div className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    fontSize="28px"
                    color="#08404F"
                    />
                  {product?.city.name}
                </div>
                <ProductRating rating={average} />
              </div>
              <ProductImage img={product?.url_img} />
              <div className="verMas">
                <p className="precio"> ${product?.cost} </p>
                <button className="btn-ver" onClick={() => setModalShow(true)}>
                  Ver Más
                </button>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  img={product?.url_img}
                  name={product?.name}
                />
              </div>
              <div className="card-bodys">
                <SectionTitle underline>
                  Detalles de la experiencia
                </SectionTitle>
                <p>{product?.description}</p>
              </div>
              <ProductFeature
                features={product?.characteristics}
              ></ProductFeature>
              {currentUser && (
                <button
                  className="cardDetail-product-review"
                  onClick={() => setModalShowReview(true)}
                >
                  Dar reseña
                </button>
              )}
              <SectionTitle underline>Reserva tu experiencia </SectionTitle>
              <div className="detail-product-reservations">
                <CalendarComponent
                  productId={product?.id}
                  onDateChange={handleDateChange}
                  labelNeeded={true}
                />

                <Link
                  className="button-enviar"
                  to={`/product/reservation/${product.id}?date=${
                    selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""
                  }`}
                >
                  <button className="button-enviar" type="submit">
                    Reservar
                  </button>
                </Link>
              </div>
              <SectionTitle underline>¿Donde nos encontras? </SectionTitle>

              <div className="footer-detail">
                { <CustomMaps address={product?.address} latitud={product?.latitude} longitud={product?.longitude}/> }
              </div>
            </div>
          </div>
          <ModalReview
            show={modalShowReview}
            onHide={() => setModalShowReview(false)}
            idUser={product.id}
            productName={product.name}
          />
        </>
      )}
    </>
  );
};

export default Detail;
