import React,{ useEffect, useState } from "react"
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import { formatDistanceToNow, } from 'date-fns';
import { FaRegClock,} from 'react-icons/fa';
import { AiOutlineLike,} from 'react-icons/ai';
import { Link,useNavigate } from "react-router-dom";

function Activities() {
    const [profileLikes, setProfileLikes] = useState([]);
    const navigate =useNavigate();
    const [profileComments, setProfileComments] = useState([]);
    const profiledetails= { 
       boxShadow:'1px 1px 3px rgba(0, 0, 0, 1)',
       background:'white',
     border: '1px solid #ccc',
     width:'99%',
    
     }
     useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/likes/profile',  {
              headers: {
                accessToken: localStorage.getItem('accessToken'),
              },
            });
            const response2 = await axios.get('http://localhost:3001/comments',  {
              headers: {
                accessToken: localStorage.getItem('accessToken'),
              },
            });
            setProfileLikes(response.data);
            setProfileComments(response2.data);
            //like buttn
            
            
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchPosts();
      }, []);
       
  return (
    <div>
     <Col>
    {profileLikes.map((value) => (
     
      <Col  className='title'  key={value.id}>

   
    
    <div style={profiledetails}  ></div>
    <div style={{fontSize:'12px'}}><span>You <AiOutlineLike size={15}/></span><b onClick={() => navigate(`/forums/fd/${value.TopicId}`)}>"{value.Post}"</b>
    <span style={{fontSize:'10px',fontFamily:'Helvetica',marginTop:'20px', float:'right'}}><FaRegClock/>
      {formatDistanceToNow(new Date(value.createdAt)) + ' ago'}</span>
    </div> 
    <hr/>
    </Col>
    ))}
     <div >
    {profileComments.map((value1) => (
     
      <Col   className='title'  key={value1.id}>

   
    
    <div style={profiledetails}  ></div>
    <div style={{fontSize:'12px'}}><span>You commented on</span><b onClick={() => navigate(`/forums/fd/${value1.TopicId}`)}>"{value1.Post}"</b>
    <span style={{fontSize:'10px',fontFamily:'Helvetica',marginTop:'20px', float:'right'}}><FaRegClock/>
      {formatDistanceToNow(new Date(value1.createdAt)) + ' ago'}</span>
    </div> 
    <hr/>
    </Col>
    ))}

    </div>
   
</Col>
    </div>
  )
}

export default Activities
