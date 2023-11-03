// ConditionalNavbar.js

import React from 'react';
import { useLocation, } from 'react-router-dom';
import AppNavbar from './Navbar';

const ConditionalNavbar = () => {
  const location = useLocation();
  

  // List of paths where Navbar should not be shown
  const excludePaths = ['/payment_gateway/'];

  if (location.pathname.startsWith(excludePaths)) {
    return null;
  }

  return <AppNavbar/>;
};

export default ConditionalNavbar;
