import React,{useState,useEffect,} from 'react'
import {Helmet} from 'react-helmet'

import { Container, Row,Alert,Nav,Col,Button,} from 'react-bootstrap';
import axios from 'axios';
import { FaExclamationTriangle,FaRegClock,FaUser} from 'react-icons/fa';
import { BiComment} from 'react-icons/bi';
import { AiOutlineLike,} from 'react-icons/ai';
import { GrFormView} from 'react-icons/gr';
import { useAuth } from '../helper/AuthContext';
import {   useNavigate,Link } from 'react-router-dom';
import CreatePostModalbd from '../components/CreatePostModalbd';
import SearchComponent from '../components/SearchComponent'
  
import { formatDistanceToNow, } from 'date-fns';// to get date




//truncate the post content


function truncateContent(content, maxWords) {
  const words = content.split(' ');

  if (words.length > maxWords) {
    const truncatedWords = words.slice(0, maxWords);
    return (
      <>
        {truncatedWords.join(' ')} <Link>... read more</Link>
      </>
    );
  }
}

const Forumsbd = () => {
   const [listOfPosts, setListOfPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[likedPosts, setLikedPosts]=useState([])
  //const postsPerPage = 5; // Number of posts to show per page
  const fetchPosts = async (page) => {
   
    try {
      const response = await axios.get(`http://localhost:3001/topics/posts/bd?page=${page}`, {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      });

           setListOfPosts(response.data.listOfPosts);
      setTotalPages(response.data.totalPages);

     // getting list of liked posts by the logged in user where TopicId is the id for each topic liked
    
      setLikedPosts(response.data.likedPosts.map((like)=>{ 
        return like.TopicId;
       
        
      }));

       
      
     
          
       
    

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

   
  //pagination navigation
   const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchPosts(page);
    }
  };
  // count views
  const handleViewPost = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/topics/views/${postId}`,
        null,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.data.success) {
        // View count incremented successfully
      } else {
        // Failed to increment view count
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate(`/forums/fd/${postId}`);
  };
  
  
  
  
//update posts instantly without a page reloader
const updatePosts = (newPost) => {
  setListOfPosts((prevPosts) => [newPost, ...prevPosts]);
}

  const [lgShow, setLgShow] = useState(false);
  const navigate =useNavigate();
  const { authState,   } = useAuth();
  if (!authState || !localStorage.getItem('accessToken')) {
    navigate('/login');
  }else
  {

    
  return (
    
    
    <div>
     <Helmet><title>Sport Forum</title></Helmet>
      <div>
      <br/>
      
      
       
      <Container>
      <h5>Sport Forum</h5>
      <p>Engage in lively conversations about a wide range of sports, from popular mainstream events to niche activities. Share insights, opinions, and latest updates.</p>
    
   <Row >
      <Col>
      <CreatePostModalbd show={lgShow} onHide={() => setLgShow(false)} updatePosts={updatePosts}/>{/*sending as props*/}
      </Col>
      <Col>
      <Alert variant="danger" style={{height: '60px'}}  >
        
       
           <Nav.Link  to=""><FaExclamationTriangle size={26} /> Report abuse</Nav.Link>
        
      </Alert>
      </Col>
   </Row>
  
      <Row>
      <Col xs="12" md="8">
    
<SearchComponent/>
          {/* Posts */}
          <h4  style={{fontFamily:'Helvetica'}}>Recent Topics</h4>
          <div>
           
          {listOfPosts.length > 0 ? (
  listOfPosts.map((post) => (
    <div className='box-shadow1' style={{width:'100%', }} key={post.id}>
      <div className='title'   onClick={()=>handleViewPost(post.id)}>
        <h5 className='postTopic' >{post.topic.charAt(0).toUpperCase() + post.topic.slice(1)}</h5>
         
     <center>   <div style={{width:'80%',justifyContent: 'space-around',height:'15px',display: 'flex'}}>
           <span  style={{marginTop: '-10px',  textTransform: 'capitalize',fontSize:'11px',fontFamily:'Helvetica'}}><FaUser/>
         {post.firstName} {post.lastName} </span> <span style={{marginTop: '-10px',fontSize:'11px',fontFamily:'Helvetica'}}> 
         <FaRegClock/> {' '}
{(() => {
  try {

    return formatDistanceToNow(new Date(post.createdAt)) + ' ago';
  } catch (error) {
    console.error('Error formatting date:', error);
    return ''; // Return an empty string or a default value in case of error
  }
})()} </span></div></center>
        <p  style={{textAlign: 'left',fontSize:'12px',fontFamily:'Arial'}}> {truncateContent(post.content, 20)} {/* Display 50 words */} </p>
        <hr/>
        <div className='col-12 inline' style={{ display: 'flex', justifyContent: 'space-around' }}>
  <span><AiOutlineLike size={24} className={likedPosts.includes(post.id) ? "blue" : ""} /> {post.Likes?.length || 0} </span>
  {/* to make length of comment ready even if it's 0 && likedPosts.includes(post.id) makes button change color
  if its liked*/}
  
  <span><BiComment size={24} />{post.Comments?.length || 0} </span> 

  <span><GrFormView size={24} />{post.views}</span>
 
</div>
<hr/>
      

      </div>
      </div>
    ))
    
  ) : (
    <p>No posts available.</p>
  )}
  
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant={page === currentPage ? 'primary' : 'outline-primary'}
          >
            {page}
          </Button>
        ))}
      </div>
 
</div>
   
        </Col>
        
       
        
        <Col xs="12" md="4">
          {/* First Section */}
          <br/><br/> 
        <div className='bg-light' >
        
            
          </div>
          
          <div className='bg-light ADS' >
       
         
            <h4>Ads here</h4>
            pace your ads here
          </div>
        </Col>
      </Row>

      </Container>
      </div>
     
    </div>
    
  )}
}


export default Forumsbd
