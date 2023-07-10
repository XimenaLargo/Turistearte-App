import Modal from 'react-bootstrap/Modal';
import Carousel from './Carousel';
import './MyVerticallyCenteredModal.scss'

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className='header-modal' closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='body-modal'>        
        <Carousel img={props.img}/>        
      </Modal.Body>     
    </Modal>
  );
}

export default MyVerticallyCenteredModal