import React, { useState } from 'react';
import { Container, Form,Button, } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';
function PaymentPage() {
  
  const [inputAmount, setInputAmount]= useState('')

  const handleInputChange = (event) => {
    setInputAmount(event.target.value);
  };

  const navigate= useNavigate();
  const Payment=()=>{
    if(inputAmount !==''){
    navigate(`/payment_gateway/${inputAmount}`)}
    }
  

  
  return (
    <div>
      <Helmet><title>Payment Page</title></Helmet>
        <Container>
          
          <center><br/><br/>
            <div style={{background:'#f4edf5',width:'500px',boxShadow: '1px 1px 8px rgba(0, 0, 0, 1)', height:'250px'}}>
            
       
              <Form onSubmit={(e) => e.preventDefault()}><br/><br/>
            
                <Form.Label>Amount</Form.Label>
                <Form.Control
          className="mb-2"
          id="inlineFormInput"
          type='number'
          value={inputAmount}
          placeholder='5000'
          onChange={handleInputChange}
          // disabled={isSubmitting}
          
        />
                
             <br/>
              <br/>
              <Button className='mybtn' onClick={Payment}  disabled={inputAmount === '' } >Make Payment</Button>
              </Form>
      
      </div></center>
      </Container>
    </div>
  )
}

export default PaymentPage
