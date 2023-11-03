import './Carousels.css';
import React, { useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../helper/AuthContext';
import { TweenMax, Power3,Circ, Expo } from 'gsap';
import {Button} from 'react-bootstrap';

function AppCarousels() {
  let container = useRef(null);
  const { authState, setAuthState  } = useAuth();

  useEffect(() => {
    const title = container.querySelector('.SliderTitle');
    const content = container.querySelector('.content');
    const button = container.querySelector('.cta-button');
    const stripe = container.querySelector('.StripeBlue');

    TweenMax.to(stripe, 2.4, {
      delay: 0,
      width: "100%",
      ease: Expo.easeInOut
    });

    TweenMax.from(title, 1, {
      delay: 1,
      opacity: 0,
      
      ease: Circ.easeInOut,
      onComplete:()=>title.style.opacity=1  
    });

    TweenMax.from(content, 2.1, {
      delay: 1.5,
      opacity: 0,
      
      ease: Power3.easeInOut,
      onComplete:()=>content.style.opacity=1  
    });

    TweenMax.from(button, 1, {
      delay: 2,
      opacity: 0,
      scale: 0.8,
      ease: Power3.easeInOut,
      onComplete:()=>button.style.opacity=1  
    });

    
  }, []);

  return (
    <div className="elegant-animation" ref={el => (container = el)}>
      <div className='StripeBlue'><h3 className='SliderTitle'>Learning Made Easy</h3></div>
      
      <p className="content">In My School, we create a supportive environment 
      where every student is encouraged to learn, grow, and thrive. With a strong tradition 
      of academic success and a dedication to well-rounded development, we are a center 
      of knowledge and character-building</p>
      {!authState.status ? (
        <>
      <Button variant='outline-primary' as={Link} to='/login' className="cta-button">Get Started</Button>
     </>):(
      <>
      <Button variant='outline-primary' as={Link} to='/forums' className="cta-button">Explore</Button>
      </>
     )}
    </div>
  );
};

export default AppCarousels;
