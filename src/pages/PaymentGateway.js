import React, { useState } from 'react';
import { useParams,Link ,useNavigate} from 'react-router-dom';
import { Container, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { SiContactlesspayment } from 'react-icons/si';
import { Formik} from 'formik';
import {Helmet} from 'react-helmet';
import * as yup from 'yup';
import axios from 'axios';
 

const PaymentGateway = () => {
  const navigate = useNavigate();
  const { amount } = useParams();
  const commission = (parseFloat(amount) * 0.03);
  const amountToBePaid = (commission + parseFloat(amount));
  const roundedAmountToBePaid = amountToBePaid.toFixed(2);
  const[isSubmitting,setIsSubmitting]=useState(false);

  const handleSubmit=async({setSubmitting})=>{
    setIsSubmitting(true);
   try {
    
    
      
          const response = await axios.post('http://localhost:3001/auth/balance', {amount},
          {headers: {
            accessToken: localStorage.getItem('accessToken'),
          },}
          );
          console.log(response);
          setTimeout(() => {
            
            setIsSubmitting(false)
          }, 2000);

          navigate('/profile')
   } catch (error) {
    
   }

    
      
      
  
   

  }

  return (
    <div>
      <Helmet><title>Payment Gateway</title></Helmet>
      <Container>
        <center>
          <br /><br />
          <div style={{ background: '', width: '500px', boxShadow: '1px 1px 8px rgba(0, 0, 0, 1)', height: '500px' }}>
            <SiContactlesspayment size={40} className='text-success' />
            <Col md='6' className='text-success'>
              <span style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '15px' }}>Secure </span>
              <span md='6' className='text-warning'>Payment Gateway</span>
            </Col>
            <br/>
            <Formik
              initialValues={{
                cardNumber: '',
                cardName: '',
                expirationDate: '',
                cvv: ''
              }}
              validationSchema={yup.object().shape({
                cardNumber: yup.string().matches(/^[0-9]+$/,'Please type valid card numbers').min(12, 'Invalid card number').max(16, 'Invalid card number')
                .required('Card number is required'),
                cardName: yup.string().required('Cardholder name is required'),
                expirationDate: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/,'Invalid date format').required('Expiration date is required'),
                cvv: yup.string().required('CVV is required').matches(/^[0-9]+$/,'Please type valid CVV').min(3, 'Invalid CVV').max(4, 'Invalid CVV')
              })}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form onSubmit={handleSubmit}>
                  <Col md='10'>
                  <Form.Group controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234-5678-9101-1121"
                      name="cardNumber"
                      onChange={handleChange}
                      value={values.cardNumber}
                      isInvalid={touched.cardNumber && errors.cardNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cardNumber}
                    </Form.Control.Feedback>
                  </Form.Group></Col>
<Col md='10'>
                  <Form.Group controlId="cardName" >
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Smith Rowe"
                      name="cardName"
                      onChange={handleChange}
                      value={values.cardName}
                      isInvalid={touched.cardName && errors.cardName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cardName}
                    </Form.Control.Feedback>
                  </Form.Group></Col>

                  <Row>
                    <Col >
                      <Form.Group controlId="expirationDate">
                        <Form.Label>Exp. Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          name="expirationDate"
                          onChange={handleChange}
                          value={values.expirationDate}
                          isInvalid={touched.expirationDate && errors.expirationDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.expirationDate}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col >
                      <Form.Group controlId="cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="123"
                          name="cvv"
                          onChange={handleChange}
                          value={values.cvv}
                          isInvalid={touched.cvv && errors.cvv}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cvv}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                 <br/>

                  <Button className='btn-success' type="submit">
                    {isSubmitting ? <Spinner animation='border' size='sm'/> : `Pay
                    \u20A6${roundedAmountToBePaid}`}
                    </Button><br/><br/>
                  <Button className='btn-warning ml-3' as={Link} to='/profile' disabled={isSubmitting}>Cancel</Button>
                </Form>
              )}
            </Formik>
          </div>
        </center>
      </Container>
    </div>
  );
}

export default PaymentGateway;
