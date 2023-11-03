import React, { useState, } from 'react';
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap';

import './Navbar.css';
import { Link ,} from 'react-router-dom';
import SignupModal from './SignupModal'; // Import the SignupModal component

import {FaHome,FaUserCircle} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {BiSolidGroup} from 'react-icons/bi';
import {MdOutlineForum} from 'react-icons/md';
import { GiWallet } from 'react-icons/gi';


import { useAuth } from '../helper/AuthContext';


//sending navbar to conditional navbar in order render the navbar in certain routes
 
function AppNavbar() {
  var navbarWidth = {width:'60px'};
  const [lgShow, setLgShow] = useState(false);
 
  const { authState, setAuthState  } = useAuth();
  
  const logout = () => {
    localStorage.removeItem("accessToken");
    
    setAuthState({firstName:"", lastName:"",usernameOrEmail:"",balance:"",
      id: 0,
      status:false});
      
  };
 

  return (
    <div>
      
      <Navbar expand="lg" className="nav-headbg fixed-top">
        <Container>
          
        {!authState.status ? ( /* if authState is not set display this */
              <>
              
          <Navbar.Brand as={Link} to="/">
            My School
          </Navbar.Brand> </>
          ) : ( 
            <>  
             <Navbar.Brand as={Link} to="/profile">
             
  <span
    style={{
      textTransform: 'capitalize', // Capitalize first letter of name
    }}
  >
    {authState.firstName} {authState.lastName}
  </span>
          </Navbar.Brand>  
            </>
            )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
          
            <Nav className="me-auto">
            
             
             {!authState.status ? ( /* if authState is not set display this */
              <>
             
               <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              {/* Replace the "Link" with SignupModal */}
              <SignupModal show={lgShow} onHide={() => setLgShow(false)} />
              
            </>
            ) : (  /* else if authState is  set ,display this */
              <> 
               <Nav.Link as={Link} to="/">
             <FaHome size={28} style={navbarWidth}/>
            </Nav.Link>

              <Nav.Link as={Link} to='/forums' >
                <BiSolidGroup size={28} style={navbarWidth} />
              </Nav.Link>
                <Nav.Link as={Link}  to="/profile">
              <FaUserCircle size={28}/>
            </Nav.Link>
              
              <NavDropdown as={Link} to="/forums" title={<MdOutlineForum style={navbarWidth}  size={28}/>} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/forums/fd">Technology</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/forums/bd">Sports</NavDropdown.Item>
                
              </NavDropdown>
              <Nav.Link as={Link}  to="/make_payment">
          <GiWallet size={28} style={navbarWidth} />
      
            </Nav.Link>
            <Nav.Link as={Link} onClick={logout} to="/login">
          <FiLogOut size={24} style={navbarWidth} className='text-danger'/>
      
            </Nav.Link>
            
           
            
              </>
              )}
            
            </Nav>
              
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default AppNavbar;
