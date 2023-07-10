import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import "./ReviewStyles.scss";
import { ContextGlobal } from "../utils/global.context";
import Rating from "react-rating-stars-component";
import { createReview } from "../utils/services/Apis/ReviewApi";

function ModalReview(props = false) {
  const {
    state: { currentUser },
  } = useContext(ContextGlobal);

  const [dataRequest, setDataRequest] = useState({
    account: { id: currentUser ? currentUser.id : 1 },
    product: { idproduct: props.idUser },
    stars: 0,
    comment: "",
  });

  const handleRatingChange = (newRating) => {
    setDataRequest({ ...dataRequest, stars: newRating });
  };

  const handleCommentChange = (e) => {
    setDataRequest({ ...dataRequest, comment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createReview(dataRequest);
      props.onHide();
    } catch (error) {}
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-review-content"
      >
        <Modal.Header closeButton className="modal-review">
          <Modal.Title>Cuéntanos cómo fue tu experiencia en...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-review">
          <h4 className="tittle-tour">{props.productName}</h4>
          <form className="review-form">
            <div>
              <div className="options">
                <span className="label-textarea">Elije una puntuación:</span>
                <Rating
                  count={5}
                  value={dataRequest.stars}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
            </div>
            <div>
            <span className="label-textarea">Agrega un comentario:</span>
                <textarea
                  value={dataRequest.comment}
                  required
                  onChange={handleCommentChange}
                />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-comenzar"
            type="submit"
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReview;
