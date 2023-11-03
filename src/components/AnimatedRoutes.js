import React from 'react'
import {  Route, Routes, Navigate,useLocation} from 'react-router-dom';
import { AnimatePresence} from 'framer-motion';

import Redirect from './Redirect';


import Redirectbd from './Redirectbd';
import PaymentGateway from '../pages/PaymentGateway';
import PaymentPage from '../pages/PaymentPage';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Homepage from '../pages/Homepage';
import Login from '../pages/login';
import Forums from '../pages/Forums';
import Forumsfd from '../pages/Forumsfd';
import Forumsbd from '../pages/Forumsbd';
import { AuthProvider, useAuth } from '../helper/AuthContext';
import Forumsfdetails from '../pages/Forumsfdetails';

function AnimatedRoutes() {
  const location= useLocation();
    const ProtectedRoute = ({ element: Component, ...rest }) => {
        // Check if the user is authenticated, if not, redirect to login page  v
        const { authState, } = useAuth();
        return authState ? <Component {...rest} /> : <Navigate to="/login" />;
      };
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
       <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Protected route */}
              
             
              <Route path="/forums" element={<ProtectedRoute element={Forums} />} />
              <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
              <Route path="/redirect" element={<ProtectedRoute element={Redirect} />} />
              <Route path="/redirectbd" element={<ProtectedRoute element={Redirectbd}/>} />
            <Route path="/forums/fd" element={<ProtectedRoute element={Forumsfd } />} />
            <Route path="forums/fd/:id" element={<ProtectedRoute element={Forumsfdetails } />} />
            <Route path="/forums/bd" element={<ProtectedRoute element={Forumsbd } />} />
            <Route path="/make_payment" element={<ProtectedRoute element={PaymentPage } />} />
            <Route path="/payment_gateway/:amount" element={<ProtectedRoute element={PaymentGateway } />} />
            </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
