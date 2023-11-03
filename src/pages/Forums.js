import React,{useState} from 'react'
import { Container, Row,Alert, Button,Col } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
function Forums() {
  const [show, setShow] = useState(true);
  
  

  return (
    
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
      <br/>
      
      <Container>
      
   
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading> <FaExclamationTriangle size={38} /> </Alert.Heading>
        <p>
          All Forums are closely monitored.Irrelevant topics will be deleted
        </p>
      </Alert>
   
  
      <Row>
        <Col md='7' xs='12'>
          {/* First Section */}
          <div className=' box-shadow1' style={{  padding: '20px' }}>
          <img
        src="/icons/male-clerk-hitting-the-cash-register-over-the-vinyl-sheet-svgrepo-com.svg" // Adjust the path to the SVG file
        alt="Icon 1"
        style={{ width: '60px', height: '60px' }}
      />
            <h4>Technology</h4>
            <p> Welcome to the Technology Enthusiasts Hub, where innovation meets discussion!
               This forum is a gathering place for individuals passionate about all things tech.
                Whether you're a seasoned developer, a gadget aficionado, or simply curious about the
                 latest trends, this is the community for you 
              </p>
              <Link to="/forums/fd"><Button variant="outline-info"  >Join Forum </Button></Link>
               <hr/>
          
         
          
         {/* second */}
          
          <img
        src="/icons/male-clerk-hitting-the-cash-register-over-the-vinyl-sheet-svgrepo-com.svg" // Adjust the path to the SVG file
        alt="Icon 1"
        style={{ width: '60px', height: '60px' }}
      />
            <h4>Sports</h4>
            <p>Welcome to the Sports Fanatics Arena, where passion meets competition! This forum is the ultimate destination for sports enthusiasts of all kinds. Whether you're a die-hard fan, an aspiring athlete, or just looking to stay active and informed, this community is for you.
              </p>
              <Link to="/forums/bd"><Button variant="outline-primary"  >Join Forum </Button></Link>
              <hr/>
            {/* third */}
          </div>
          
        </Col>
        
       <br/>
        
        <Col md='5' xs='12'>
          {/* First Section */}
          <br/><br/>
       
          <div className='bg-light ADS' >
       
         
            <h4>Ads here</h4>
            pace your ads here
          </div>
        </Col>
      </Row>

      </Container>
      </motion.div>
  )
}

export default Forums
