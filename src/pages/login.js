// Frontend: Login.js

import React, { useState,  } from 'react';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import { Form, InputGroup, Container, Button, Alert,Col,Spinner } from 'react-bootstrap';
import { BsKey } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {  useAuth } from "../helper/AuthContext"; // Import named export;
import { motion } from 'framer-motion';


function Login() {
  const navigate = useNavigate();
  const { setAuthState } = useAuth(); // Use named import here
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
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

  const login = () => {
    setLoading(true);
    setErrorMessage('');

    if (formData.usernameOrEmail === '' || formData.password === '') {
      setErrorMessage('Please enter your login credentials.');
      setLoading(false);
      return;
    }

    axios
      .post('http://localhost:3001/auth/login', formData)
      .then((response) => {
        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setAuthState(true); // Set authentication state to true upon successful login
          navigate('/');
          localStorage.setItem('accessToken', response.data.token); // Save the accessToken in localStorage
          setAuthState({firstName:response.data.firstName, lastName:response.data.lastName,
            id:response.data.id,usernameOrEmail:response.data.email,balance:response.data.balance,
            status:true});// to display user details immediately after  login
        }

        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('poor internet connection');
        }
        setLoading(false);
      });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
      <Helmet><title>Login</title></Helmet>
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Col className='loginPage ' md='6' xs='11'>
          <div className='loginPageContainer'>
            <br />
            <center>
              <FaUserAlt size={76} style={{ color: 'white' }} className='nav-headround' />
            </center>
            <br />
            
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Form>
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default' className='nav-headbg'>
                  <FaUserAlt />
                </InputGroup.Text>
                <Form.Control
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                  placeholder='username/email'
                  type='text'
                  name='usernameOrEmail'
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                />
              </InputGroup>
              <hr />
              <InputGroup className='mb-3'>
                <InputGroup.Text id='inputGroup-sizing-default' className='nav-headbg'>
                  <BsKey />
                </InputGroup.Text>
                <Form.Control
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                  placeholder='***********'
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
              <Button className='mybtn' onClick={login}>
                {loading ? <Spinner/> : 'Login'}
              </Button>
            </Form>
          </div>
        </Col>
      </Container>
    </motion.div>
  );
}

export default Login;
