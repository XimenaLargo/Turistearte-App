import React from 'react'
import { useState , useContext , useEffect} from 'react'
import { ContextGlobal } from '../../utils/global.context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import './Carousel.scss'

const Carousel = ({img}) => {

    const { state } = useContext(ContextGlobal);
    const { tours } = state
    const results = tours

    const [images, setImages] = useState(img);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(''); 
    useEffect(() => {
          setSelectedImage(img[0].url_img);
        }
      , []);
    
    const previous = () => {
        const condition = selectedIndex > 0;
        const nextIndex = condition ? selectedIndex - 1 : images.length - 1;
        setSelectedImage(images[nextIndex].url_img);
        setSelectedIndex(nextIndex);
    };

    const next = () => {
        const condition = selectedIndex < images.length - 1;
        const nextIndex = condition ? selectedIndex + 1 : 0;
        setSelectedImage(images[nextIndex].url_img);
        setSelectedIndex(nextIndex);
    }
    
    return (
        <div className='container-carousel'>    
          <button className='btn-carousel' onClick={previous}><FontAwesomeIcon icon={faArrowLeftLong} /></button>
          <img className='img-carousel' src={selectedImage} alt="imagen"/>
          <button className='btn-carousel' onClick={next}><FontAwesomeIcon icon={faArrowRightLong} /></button>
        </div>
  )
}

export default Carousel

