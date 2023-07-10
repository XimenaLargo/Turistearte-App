import './ProductImage.scss'

const ProductImage = ({ img }) => {    
    return (
        <div className="contenedor">
          <div className="contenedor-banner" style={{ backgroundImage: `url(${img[0].url_img})` }}>
          </div>
          <div className="contenedor-otros">
            <div className="contenedor-otros-card" style={{ backgroundImage: `url(${img[1].url_img})` }}>
            </div>
            <div className="contenedor-otros-card" style={{ backgroundImage: `url(${img[2].url_img})` }}>
            </div>
            <div className="contenedor-otros-card" style={{ backgroundImage: `url(${img[3].url_img})` }}>
            </div>            
            <div className="contenedor-otros-card" style={{ backgroundImage: `url(${img[4].url_img})` }}>             
            </div>
          </div>
        </div>
    );
  };
  
  export default ProductImage;
  
  