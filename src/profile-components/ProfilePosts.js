import React,{useState,useEffect,} from 'react'
import { Form, InputGroup,Row,Col, Container, Image, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { formatDistanceToNow, } from 'date-fns';
import { FaUserClock,} from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';


function ProfilePosts() {
    const [profileposts, setProfilePosts] = useState([]);
     const profiledetails= { 
        boxShadow:'1px 1px 3px rgba(0, 0, 0, 1)',
        background:'white',
      border: '1px solid #ccc',
     width:'99.5%'
     
      }

      const navigate =useNavigate();


      //truncate the post content


function truncateContent(content, maxWords) {
    const words = content.split(' ');
  
    if (words.length > maxWords) {
      const truncatedWords = words.slice(0, maxWords);
      return (
        <>
          {truncatedWords.join(' ')} <Link>... </Link>
        </>
      );
    }
  }
  
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('http://localhost:3001/topics/profile/posts',  {
              headers: {
                accessToken: localStorage.getItem('accessToken'),
              },
            });
            setProfilePosts(response.data);
            //like buttn
            
            
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchPosts();
      }, []);
       
  return (
    <div>
       
      {profileposts.map((value) => (
        <Col xs='6' md='6' className='title' style={{display:'inline-block'}} key={value.id}>

     
      
      <div style={profiledetails}  onClick={() => navigate(`/forums/fd/${value.id}`)}>
      <b style={{fontSize:'12px'}}>{value.topic}</b>
      <p style={{fontSize:'10px'}}>{truncateContent(value.content,30)}</p>
      </div>
      
     
      
      
      
      </Col>
          ))}
    </div>
  )
}

export default ProfilePosts
