import React,{useState,useEffect,} from 'react'
import { Container, Row,Form,Col,Button,Image,} from 'react-bootstrap';
import axios from 'axios';
import { FaEdit, FaExclamationTriangle,FaRegClock, FaSave,} from 'react-icons/fa';
import {  MdUpdate } from 'react-icons/md';
import { BiComment} from 'react-icons/bi';
import { AiOutlineLike, AiOutlineSend,AiFillEdit} from 'react-icons/ai';
import { GrFormView} from 'react-icons/gr';
import { useAuth } from '../helper/AuthContext';
import {   useNavigate,useParams } from 'react-router-dom';
import { formatDistanceToNow, } from 'date-fns';// to get date
import DeleteModal from '../components/DeleteModal'
import DeletePostModal from '../components/DeletePostModal'
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';




var author = {display:'flex',height:'15px' , float:'left',
              marginTop:'10px' ,fontSize:'11px',justifyContent:'space-evenly',fontFamily:'Helvetica',
              background: 'linear-gradient(125deg, #f8f9fa,#007bff)',boxShadow: '1px 1px 8px rgba(0, 0, 0, 1)',
              borderRadius:'40px', 
  
            };
var author1={textTransform:'capitalize'};
var time={textTransform:'lowercase'}




function Forumsfdetails  () {
    let { id } = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [inputComment, setInputComment] = useState('');//posting comment
    const [comments, setComments] = useState([]); //fetching comments
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [likedPosts, setLikedPosts] = useState([]); // Initialize likedPosts with an empty array
    // ...

    
    
    const [postObject, setPostObject] = useState({ Likes: [] }); // Initialize postObject.Likes with an empty array
    //editing post state
    const [isEditing, setIsEditing] = useState(false);

const [editedContent, setEditedContent] = useState(postObject.content);
const [editedTopic, setEditedTopic] = useState(postObject.topic);

const [editedCommentId, setEditedCommentId] = useState(null); // Track the ID of the comment being edited
const [editedCommentBody, setEditedCommentBody] = useState(''); // Store the edited comment body

    //delete modal
    const [show, setShow] = useState(false);

    
    const handleShow = () => setShow(true);
    const handleInputChange = (event) => {
      setInputComment(event.target.value);
    };
    const navigate =useNavigate();
    const { authState,  } = useAuth();
    if (!authState|| !localStorage.getItem('accessToken')) {
      navigate('/login');
    }
    //handleDeleteComment
    const handleDeleteComment = (commentId) => {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    };

    useEffect(() => {
      // Fetch post details and comments
    const fetchData = async () => {
      try {
        const Postresponse = await axios.get(`http://localhost:3001/topics/posts/fd/${id}`,{headers: {
          accessToken: localStorage.getItem("accessToken"),
        },});
        const commentsResponse = await axios.get(`http://localhost:3001/comments/${id}`,{headers: {
          accessToken: localStorage.getItem("accessToken"),
        }},);
        

        setPostObject(Postresponse.data.post);
        setComments(commentsResponse.data.comments);
       
          //to get each user that liked the post
          setLikedPosts(Postresponse.data.likedPosts.map(like => like.TopicId));
          setEditedContent(postObject.content);
          setEditedTopic(postObject.topic);
         
          // for retaining post content in editing mode 
          //and also pass it when closing the use effect hook
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    fetchData();
  }, [id,postObject.content,postObject.topic,]);

 

  
    


        //comments handler
        const addComment =()=> {
           //.toLowerCase() is used to make the comment lowercase. 
          // This ensures that the check is case-insensitive, so it will catch variations like "Goat", "goat", "GOAT", etc.
          //check for abusive comment
          if (inputComment.toLowerCase().includes("goat")||inputComment.toLowerCase().includes("mumu")) {
            setErrorMessage("Abusive comment not allowed");
            setTimeout(() => {
              setErrorMessage(''); // Clear the error message after 2 seconds
            }, 2000); // 2000 milliseconds = 2 seconds
            return;
          }
          
        setIsSubmitting(true); // Disable the button
        
        axios
        .post(
          "http://localhost:3001/comments",
          {
            //sending as req.body to the backend
            CommentBody: inputComment,
            TopicId: id,
            Post:postObject.topic,
           

          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
     
          .then((response) => {
            if (response.data.error) {
              throw new Error(response.data.error);
            }
           
            // Handle success and post comments immediately
            const commentToAdd = {
              CommentBody: inputComment,
              firstName: response.data.firstName,
              email:response.data.email,
              lastName: response.data.lastName,
              id:response.data.id,
         
              
              
            };
            // (keep everything in the comments by destructing, change commentToAdd)
            setComments([...comments, commentToAdd]); 
            setInputComment("");
          })
          .catch((error) => {
            console.error(error); // Log the error
            setErrorMessage(error.message); // Set an error message if needed
          })
        .finally(() => {
          setIsSubmitting(false); // Enable the button
        });
      }
      
      
//liking system
const likePost = async (TopicId) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/likes',
      //sending as req.body to the backend
      { TopicId: TopicId,
      Post:postObject.topic },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    );


    if (response.data.liked) {
      setPostObject({
        ...postObject,
        Likes: [...postObject.Likes, 0],
      });
    } else {
      const likeArray = [...postObject.Likes];
      likeArray.pop();
      setPostObject({
        ...postObject,
        Likes: likeArray,
      });
    }

    // Update likedPosts state
    if (likedPosts.includes(TopicId)) {
      setLikedPosts(
        likedPosts.filter((id) => {
          return id !== TopicId;
        })
      );
    } else {
      setLikedPosts([...likedPosts, TopicId]);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

//end of like    
        
//editing post funnction
const toggleEdit = () => {
  setIsEditing(!isEditing);
  // Scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Add smooth scrolling animation
  });
  if (isEditing) {
    setEditedContent(postObject.content); // Pre-fill with current content
    setEditedTopic(postObject.topic);
  }
};
//edit comment function
const editComment = (commentId, commentBody) => {
  
  //editing the state of comment
  setEditedCommentId(commentId); // Set the ID of the comment being edited
  setEditedCommentBody(commentBody); // Set the initial value of the edited comment body
};
//edit comment Api request
const saveEditedComment = async (commentId) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/comments/${commentId}`,
      {
        editedCommentBody: editedCommentBody,
        
      },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // Update the comments array with the edited comment
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, CommentBody: editedCommentBody }
          : comment
      )
    );

    // Reset edited comment state
    setEditedCommentId(null);
    setEditedCommentBody('');
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }
};




//update post
const updatePost = () => {
  setIsSubmitting(true);
  axios
    .put(
      `http://localhost:3001/topics/editPost`,
      {
        newContent: editedContent,
        newTitle:editedTopic,
        id:id
       
      },
      {
        headers: {
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    )
    .then((response) => {
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setPostObject({
        ...postObject,
        content: editedContent,
        topic:editedTopic
      });

      toggleEdit();
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage(error.message);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};


    

    
  return (
    
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
      
      <br/>
      <Helmet>
        <title>{postObject.topic}</title>
      </Helmet>
       
      <Container>
      
    
  
      <Row >
      <Col xs="12" md="8">
          {/* Posts */}
          
         
          <div className='box-shadow1' style={{ padding: '20px', }}>
          <div >
          {isEditing ? (
    <Form.Control
      as="input"
      
      value={editedTopic}
      onChange={(e) => setEditedTopic(e.target.value)}
     
      
    />
  ):(
            <h4 style={{textAlign:'left',textTransform:'capitalize'}} >
            {postObject.topic}</h4> )} </div>
          <Col className='mx-auto' xs="10" md="4" style={author}><p>Posted By:</p> 
           <span style={author1}> {postObject.firstName} {postObject.lastName}</span>
           <span style={time}><FaRegClock/>{' '}
{(() => {
  try {

    return formatDistanceToNow(new Date(postObject.createdAt)) + ' ago';
  } catch (error) {
   
    return ''; // Return an empty string or a default value in case of error
  }
})()} 
</span>
             </Col>
         <br/><br/>
         {/* conditionally rendering the post content with edit function */}
         <div style={{ textAlign: 'left' }} >
  {isEditing ? (
    <Form.Control
      as="textarea"
      rows={12}
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
     
      
    />
  ) : (
    <p>{postObject.content}</p>
  )}
  <div>
    
  </div>
</div>

          <div className='mx-auto d-block'>{postObject.image && <Image src={`http://localhost:3001/topicuploads/${postObject.image}`} fluid />}
           </div> 
           <center>
</center>
             <br/>
             <span xs="5" md="9" className='mx-auto ' style={{width:'80%',  justifyContent:'space-around', display:'flex'}}>
             <Button
  variant={likedPosts.includes(postObject.id) ? "primary" : "outline-primary"}
  onClick={() => likePost(postObject.id)}
>
  <AiOutlineLike size={22} />
  {postObject.Likes?.length || 0}
</Button>

             <Button variant='outline-primary'><BiComment size={22}/>{postObject.Comments?.length || 0}</Button>
       
             <Button variant='outline-primary' disabled><GrFormView size={22} />{postObject.views}</Button>
             {authState.usernameOrEmail === postObject.email &&( !isEditing ? (
     <Button variant="outline-primary" onClick={toggleEdit}><AiFillEdit/> 
     </Button>
  ) : (
    <Button variant="success" onClick={updatePost}>
 <MdUpdate /> Update
</Button>)

 )}
 {authState.usernameOrEmail === postObject.email &&(
  <DeletePostModal topicId={postObject.id}/>
  // topicId must be sent as prop because we used it as our backend route
  
 )}
            
            {authState.usernameOrEmail !== postObject.email &&( 
            <Button variant='outline-danger'><FaExclamationTriangle size={22} />Report</Button> )}
            
             {/* {(() =>{})()} is for immediate invoked function */}
             



             </span>
             <hr/>
             {/* comment box */}


<Col xs="12" md="12" className='fixed-bottom1 '  >
  {errorMessage && (
    <p
      style={{
        fontSize: '11px',
        height: '1px',
        fontFamily: 'Helvetica',
        color: 'red',
      }}
      className='text-danger'
    >
      {errorMessage}
    </p>
  )}
  <Form onSubmit={(e) => e.preventDefault()}>
    <Row>
      <Col xs="9" md="10"> {/* Adjust the column sizes */}
        <Form.Label  visuallyHidden>
          
        </Form.Label>
        <Form.Control
          className="mb-2"
          id="inlineFormInput"
          placeholder="Comment....."
          value={inputComment}
          onChange={handleInputChange}
          disabled={isSubmitting}
          style={{
            fontFamily: 'Arial',
            fontSize: '14px',
            padding: '8px',
          
        minWidth: '0', // Allow it to shrink
             
          }}
          

        />
      </Col>

      <Col > {/* Adjust the column sizes */}
        <Button
          disabled={inputComment === '' || isSubmitting}
          onClick={addComment}
          type='button'
          className='mb-2'
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            
        minWidth: '0', // Allow it to shrink
           
          }}
        >
          <AiOutlineSend />
        </Button>
      </Col>
    </Row>
  </Form>
</Col>
 
 {/* end of comment box */}

             {/* comment section */}
             
             <div style={{
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column', // Stack comment items vertically
  height:'500px'
}}>
  {comments.map((comment) => (
    <div key={comment.id} style={{
      display: 'flex',
  alignItems: 'flex-start',
  padding: '10px',
  margin: '10px',
  maxWidth: '600px', 
  backgroundColor: '#F0F2F5', 
  borderRadius: '10px', 
    }}>
      <div style={{
  flex: '0 0 auto',
  marginRight: '10px', 
}}>
   {comment.User?.image && (<img
    src={`http://localhost:3001/uploads/${comment.User.image}`} 
    alt={`${comment.firstName}'s Avatar`}
    style={{
      width: '40px', 
      height: '40px', 
      borderRadius: '50%', 
    }}
  />)}
  
</div>
      <div style={{ flex: '1 1 auto' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <b style={{ fontSize: '14px', textTransform: 'capitalize', fontFamily: 'Helvetica' }}>
      {comment.firstName} {comment.lastName}
    </b>
  </div>
  {/* for editing comment */}
  
  { editedCommentId === comment.id ? (
    <>
    <Form.Control
      as="textarea"
      rows={2}
      value={editedCommentBody}
      onChange={(e) => setEditedCommentBody(e.target.value)}
     
      
    />
    
     </>
    ):(
  <p style={{ fontSize: '12px', fontFamily: 'Arial', margin: '5px 0',float:'left', textAlign:'left'  }}>
 
    {comment.CommentBody.charAt(0).toUpperCase() + comment.CommentBody.slice(1)}
  </p>)}
  {/* delete comment icon*/}
  
  {authState.usernameOrEmail === comment.email && (
  
  <Col 
  name="delete"
  
  
  className="deleteButton"
>
  <br/>
  <span className="deleteIcon" onClick={handleShow} >
        <DeleteModal CommentId={comment.id}  onDelete={handleDeleteComment}/> </span>
       {editedCommentId === comment.id ? (  <Button variant='success' style={{fontSize:'12px'}} onClick={() => saveEditedComment(comment.id)}>save</Button>):(
       <span className="deleteIcon" onClick={() => editComment(comment.id, comment.CommentBody)} >
       <FaEdit/> </span>)}
  {/* sending comment.id and handleDeleteComment as prop in order
  to update comments after its been deleted
     */}
    
</Col>
  )}
  {/* replies here */}
</div>

    </div>
  ))}
 
  
</div>



</div>

        </Col>

        
      
        
        <Col xs="11" md="4" className='col-4'>
          {/* First Section */}
          <br/> <br/> 
        <div className='bg-light' >
        <img
        src="/Icons/payment-method-bank-svgrepo-com.svg" // Adjust the path to the SVG file
        alt="Icon 3"
        style={{ width: '50px', height: '50px' }}
      />
         
            <h4>Hot Forums</h4>
            
          </div>
          <hr/>
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


export default Forumsfdetails
