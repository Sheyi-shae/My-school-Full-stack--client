import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function DeletePostModal({topicId}) {
  const [show, setShow] = useState(false);
  const navigate =useNavigate();
    const [errorMessage, setErrorMessage] = useState([]); //fetching comments

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //delete post
const deleteTopic = async (topicId) => {
      
    try {
      await axios.delete(`http://localhost:3001/topics/${topicId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      handleClose();
      navigate('/forums');
  
    
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete .");
    }
  };

  return (
    <>
    <Button variant='danger' >
      <MdDelete  onClick={handleShow} size={22}/></Button>
        
   

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body><center><h5 >Permanently delete post?</h5></center></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
         
          <Button variant="success" onClick={() => {
          
    
            deleteTopic(topicId);
       
  
 }}>
            Delete 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePostModal;