import { useState } from 'react';

import { Navbar,Nav,Modal,Button} from 'react-bootstrap';
import Signup from '../pages/Signup';

function SignupModal() {
  const modalStyle = {
   
    boxShadow: '0 0 8px 2px rgba(0, 0, 255, 0.2)', // Customize the values as needed
  };

  const [lgShow, setLgShow] = useState(false);
  const closeModal = () => {  //closeModal function pass into signup page
    setLgShow(false);
  };
  


  return (
    <>
    
          
          
          <Navbar.Collapse id="basic-navbar-nav">
            
             <Nav className="me-auto">
        <Nav.Link onClick={() => setLgShow(true)}>Sign up</Nav.Link>
      </Nav>
     
          </Navbar.Collapse>
        
      

      <Modal
        style={modalStyle} // Apply the inline style directly to the modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
       
          <Modal.Header closeButton style={modalStyle}>
            <Modal.Title id="example-modal-sizes-title-lg">
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Signup closeModal={closeModal} />
          </Modal.Body>
        
      </Modal>
    </>
  );
}

export default SignupModal;
