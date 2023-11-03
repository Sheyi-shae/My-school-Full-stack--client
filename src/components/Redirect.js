import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/forums/fd');
    }, 500);

    // Clear the timer if the component is unmounted before the timeout
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div>
      <Preloader />
    </div>
  );
}

export default Redirect;
