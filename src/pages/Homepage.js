import React ,{useEffect,useState}from 'react';
import '../components/Carousels.css';
import AppCarousels from '../components/Carousels';
import {Helmet} from 'react-helmet';

import {Link} from 'react-router-dom';
import { Container, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';





function Homepage() {
 
  const[isSubmitting,setIsSubmitting]=useState(false);
   
  //rendering opacity from 0  to 1
  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    function handleScroll() {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom >= 0) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  const handleSubmit=async(data, { setSubmitting })=>{
    setIsSubmitting(true);
   try {
    const formData = new FormData();
formData.append('name', data.name);
formData.append('email', data.email);

formData.append('message', data.message);
      
          const response = await axios.post('http://localhost:3001/auth/contactus', formData,
          
          );
          
          setTimeout(() => {
            
            setIsSubmitting(false)
          }, 2000);

          
   } catch (error) {
    
   }}



  return (
    <div>
      <Helmet><title>Homepage</title></Helmet>
    <br/>
      <div xs='12'>
        {/* Carousel rapper */}
      <AppCarousels/>
      {/*  Carousel ends here */}
      <div className="section" id="section1">
        <Row >
      <Col >
          {/* First Col */}
          <div className='ColHeight' style={{ background: 'linear-gradient(34deg, #007bff 4%, #EADBDB 78%, #fff 100%)', padding:'20px' }}>
          <img
        src="/Icons/male-clerk-hitting-the-cash-register-over-the-vinyl-sheet-svgrepo-com.svg"
        alt="Icon 1"
        style={{ width: '40px', height: '40px' }}
      />
            <h5>Enroll Now</h5>
            <p>Sign up to explore the app.</p>
            
          </div>
        </Col>
        <Col>
          {/* Second Col */}
          <div  className='ColHeight' style={{ background: 'linear-gradient(34deg, #007bff 4%, #EADBDB 78%, #fff 100%)',padding:'20px' }}>
         
          <img
        src="/Icons/forum-message-svgrepo-com.svg" 
        alt="Icon 2"
        style={{ width: '40px', height: '40px' }}
      />
          
            <h5>Discussion Forums</h5>
            <p>Join forums for discussions</p>
           
            <Button variant='outline-warning' as={Link} to='/forums'>Join</Button>
            
          </div>
        </Col>
        <Col >
          {/* First Section */}
          
        <div className='ColHeight' style={{ background: 'linear-gradient(34deg, #007bff 4%, #EADBDB 78%, #fff 100%)',padding:'20px'  }}>
        <img
        src="/Icons/payment-method-bank-svgrepo-com.svg" // Adjust the path to the SVG file
        alt="Icon 3"
        style={{ width: '40px', height: '40px' }}
      />
         
            <h5>Fexibe payment</h5>
            <p>Make payments with ease</p>
            <Button variant='outline-warning' as={Link} to='/make_payment'>Pay</Button>
            
          </div>
        </Col>
        </Row>
</div>

<div className="section " id="section2">
  {/* Content for Section 2 */}
  <Row className='about'>
    <Col className='borderRight' md='6' xs='11'>
    <h5 className='text-primary'>About Us</h5>
    <p>Our school is more than just classrooms and assignments. We are a community that values integrity, respect, and inclusivity. Through various programs and extracurricular activities, we aim to shape responsible citizens who make a positive impact on the world.


We invite you to be a part of our vibrant learning community. Together, we'll embark on a journey of knowledge, growth, and boundless possibilities.

Explore My School and discover the path to a brighter future.</p>
    </Col>
  
  
  <Col md='5' xs='11'>
  <h5 className='text-primary borderRight1'>Contact Us</h5>
  <Formik
              initialValues={{
                name: '',
                email: '',
                message: '',
                
              }}
              validationSchema={yup.object().shape({
              name: yup.string().required('*'),
              email: yup.string().email('Invalid email address').required('*'),
               message: yup.string().required('*')
              })}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Col md='10'>
                  <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Seyi Adeniyi"
                      name="name"
                     
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group></Col>
<Col md='10'>
                  <Form.Group controlId="email" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="seyi@gmail.com"
                      name="email"
                      
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group></Col>

                  <Row>
                    <Col >
                      <Form.Group controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                         as="textarea"
                         style={{ height: '200px' }}
                          
                          placeholder="Message"
                          name="message"
                          
                          isInvalid={touched.message && errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    
                  </Row>
                  
                 <br/>

                  <Button className='btn-warning' type="submit">
                    {isSubmitting ? <Spinner animation='border' size='sm'/> : 'Submit'}
                    </Button><br/><br/>
                 
                </Form>
              )}
            </Formik>
  </Col></Row>
  
</div>

<div className="section" id="section3">
  {/* Content for Section 3 */}
  
</div>

{/* Add more sections as needed */}

      
      <Container>
        <br/>
      <Row>
       
       
       
      </Row>
    </Container>
      </div>
      
    </div>
  );
}

export default Homepage;
