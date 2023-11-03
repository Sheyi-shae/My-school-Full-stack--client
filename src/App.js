// App.js

import React, { useState, } from 'react';
import { BrowserRouter as Router,} from 'react-router-dom';
import Preloader from './components/Preloader';

import 'bootstrap/dist/css/bootstrap.min.css';
import ConditionNavbar from './components/ConditionalNavbar';
import './components/Preloader.css';
import AnimatedRoutes from './components/AnimatedRoutes';

import './App.css';

import { AuthProvider, useAuth } from './helper/AuthContext'; // Import AuthProvider and useAuth



const App = () => {
  
 
  const [loading, setLoading] = useState(true);
  
  
  
  // useEffect(() => {
    
   
  //   // Simulate an asynchronous process (e.g., fetching data from an API)
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); // Replace 3000 with your actual loading time in milliseconds
  // }, []);

  // ProtectedRoute component to handle protected routes
  

  

  // Your main app content component (replace this with your actual content)
  return (
    <div className='App'>
      {/* {loading ? (
        
        <Preloader />
      
      ) : ( */}
        <AuthProvider>
          <Router>
          <ConditionNavbar />   
         
             {/* //animated routes */}

            <AnimatedRoutes/>
            
            
          </Router>
        </AuthProvider>
      {/* )} */}
    </div>
  );
};

export default App;
