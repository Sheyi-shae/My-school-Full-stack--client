import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AiFillDelete} from 'react-icons/ai';
import axios from 'axios';

function DeleteModal({CommentId,onDelete}) {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
    const [inputComment, setInputComment] = useState('');//posting comment
    const [comments, setComments] = useState([]); //fetching comments

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //delete comment route handler
  const deleteComment = async (commentId) => {
      
    try {
      await axios.delete(`http://localhost:3001/comments/${commentId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
  
      // Update comments state to reflect the deletion
      setComments(comments.filter((comment) => comment.id !== commentId));
      onDelete(commentId);
      handleClose();

    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete comment.");
    }
  };

  return (
    <>
      <AiFillDelete  onClick={handleShow} size={22}>
        
      </AiFillDelete>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
         
        </Modal.Header>
        <Modal.Body><center><h5 >Are you sure</h5></center></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
         
          <Button variant="success" onClick={() => {
          
    
            deleteComment(CommentId);
       
  
 }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;