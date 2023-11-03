// Frontend: Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Container, Col, Button, Alert } from 'react-bootstrap';
import { BsUpload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helper/AuthContext';




function CreatePostbd({ closeModal ,updatePosts}) { 
  //getting post
  



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { authState } = useAuth(); // Use named import here
  
  const [formData, setFormData] = useState({
    
    topic: '',
    content: '',
    category: '',
    image: null,
  });
 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
 
  

  const post = (data) => {
    setLoading(true);
    setErrorMessage('');
   
    
//form validation
    if (formData.topic === '') {
      setErrorMessage('Please enter a topic.');
      setLoading(false);
      return;
    } else if (formData.content === '') {
      setErrorMessage('Please enter your content.');
      setLoading(false);
      return;
    } else if (formData.category === '') {
      setErrorMessage('Please select a valid category.');
      setLoading(false);
      return;
    } 

    const newFormData = new FormData();
    newFormData.append('topic', formData.topic);
    newFormData.append('content', formData.content);
    newFormData.append('category', formData.category);
    newFormData.append('image', selectedFile);
    axios
    .post('http://localhost:3001/topics', newFormData,
    {headers: {
      accessToken: localStorage.getItem('accessToken'),
    },}
    )
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.error);
          
        } else {
          
          
          setTimeout(() => {
            
            setLoading(false);
            
            closeModal(); // Call the closeModal function passed from SignupModal to close SignupModal after successful reg
          }, 500);
         const newPost = { ...response.data, createdAt: new Date() };
        updatePosts(newPost); // Add the new post to the list
        closeModal(); // Close the modal
          navigate('/redirectbd');
         
          
        }

        
       
          setLoading(false);
          
        
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } 
       
        
        
        setLoading(false);
      });
  };
  //getting posts
  
  

  return (
    <>
   
      <Container>
        <div >
          <div className='createPageContainer'>
            
            <br />
            {loading && <Alert variant='info'>Publishing your content...</Alert>}
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Form>
              <Form.Group  >
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group >
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: '200px' }}
                  placeholder="Enter your content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  
                >
                 
                 
                  <option value="Backend">Sports</option>
                  
                </Form.Control>
              </Form.Group>
              <hr/>
              <Form.Group as={Col} md='4' >
                <Form.Label> [Image upload is optional]</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                    type='file'
                    required
                    id='image'
                    name='image'
                    onChange={(event) => {
                      handleFileChange(event);
                      handleChange(event);
                    }}
                    className={`form-control visually-hidden `}
                  />
                  <label htmlFor='image' className='btn btn-file-upload mybtn'>
                    <BsUpload className='me-2' />
                    {selectedFile ? 'Change Image' : 'Choose Image'}
                  </label>
                
                </InputGroup>
                {selectedFile && (
                  <div className='mt-2'>
                    <img src={URL.createObjectURL(selectedFile)} alt='Selected' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </div>
                )}
              </Form.Group>
              <hr/>
              {loading && <Alert variant='info'>Publishing your content...</Alert>}
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
              <center><Button className="mybtn" onClick={post}>
                Post
              </Button></center>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CreatePostbd;
