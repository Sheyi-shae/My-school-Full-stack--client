import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Nav, Modal, Alert } from 'react-bootstrap';
import CreatePost from '../pages/CreatePost';

function CreatePostModal({ updatePosts }) {
  const modalStyle = {
    width: '100%',
  };

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <Alert variant="primary" style={{ height: '60px' }}>
        <Nav.Link onClick={() => setLgShow(true)}>
          <MdAdd size={26} /> Create a topic
        </Nav.Link>
      </Alert>

      <Modal
        style={modalStyle}
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton style={modalStyle}>
          <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
          <div style={{ height: '100%', width: '100%' }}>
            <CreatePost closeModal={() => setLgShow(false)} updatePosts={updatePosts} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreatePostModal;
