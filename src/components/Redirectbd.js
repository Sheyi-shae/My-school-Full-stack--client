import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';

function Redirectbd() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/forums/bd');
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

export default Redirectbd;
