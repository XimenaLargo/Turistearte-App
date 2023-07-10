import "./ProductRating.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

const ProductRating = ({rating}) =>{

    const textScore = (rating) => {
        let text =
          rating = 0 ? "Sin Reseña"
            : rating>= 0.1 && rating <= 1
            ? "Muy Malo"
            : rating >= 1.1 && rating <= 2
            ? "Malo"
            : rating >= 2.1 && rating <= 3
            ? "Regular"
            : rating >= 3.1 && rating <= 4
            ? "Bueno"
            :rating>= 4.1 && rating <= 5
            ? "Muy bueno"
            :"Sin Reseña"
        return text;
      };

    return(
        <div>
            <div className="tourScore"> 
            <span className="scoreNumber">
              {rating && parseInt(rating) }
              <FontAwesomeIcon className="tourStars" icon={faStar} />
            </span>
          </div>
        </div>
    )
}
export default ProductRating;