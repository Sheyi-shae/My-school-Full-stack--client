import React,{useState,useEffect,} from 'react'
import { Helmet } from 'react-helmet';
import { Row, Container, Image, Button, Alert, } from 'react-bootstrap';
import axios from 'axios';
import Tabs from '../components/Tabs';
import { BsPencil } from 'react-icons/bs';







function Profile() {
 
  const [errorMessage, setErrorMessage] = useState('');
  const [newImage, setNewImage] = useState(null); // State to store the new image
  const [profile, setProfile] = useState([]);
  const TopStyle = {
    boxShadow: '1px 1px 8px rgba(0, 0, 0, 1)', // Customize the shadow values as per your preference
    background: '#f0f0f0', // Customize the background color as per your preference
    padding: '20px', // Add any other styles you need here
    borderRadius: '8px', // Add rounded corners if desired
  };
  const Top2Style = {
    boxShadow: '1px 1px 8px rgba(0, 0, 0, 1)', // Customize the shadow values as per your preference
    background: '#f0f0f0', // Customize the background color as per your preference
    padding: '20px', // Add any other styles you need here
    borderRadius: '8px', // Add rounded corners if desired
    height:'auto',
  };
  //image change
  const handleFileChange = (event) => {
    const newImage = event.target.files[0];
    uploadImage(newImage);
  };
  const uploadImage = async (newImage,previousImageName) => {
    //passing newImage,previousImageName as async funtn for auto update and deletion
    setErrorMessage('');
    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('previousImage', previousImageName); // sending previous image to the bk for deletion
      
      const response = await axios.put('http://localhost:3001/auth/changedp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accessToken: localStorage.getItem('accessToken'),
        },
      });

      console.log('Profile picture changed successfully:', response.data);
      setNewImage(`http://localhost:3001/uploads/${response.data.newImageFilename}`); //display image immediately after upload

      
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        
        setTimeout(() => {
          setErrorMessage(error.response.data.error);
          
      }, 1000);
      }
      else {
        console.error('Error uploading profile picture:', error);
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/profile',  {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
        setProfile(response.data);
        //like buttn
       
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchPosts();
  }, []);

  const changePicture = () => {
    const inputElement = document.getElementById('profilePictureInput');
    inputElement.click();
  };
  
   
  
  return (
    
    <div>
        
      <Container>




{profile.map((value) => (
        <div className='post' key={value.id}>
<div style={TopStyle}>
          <Row >
          
          <Helmet>
        <title >{value.firstName} {value.lastName}'s Profile</title>
      </Helmet>
<div >
<span style={{position:'relative'}} >
  <Button className='btn-warning' 
  style={{float:'right',fontFamily:'lato',marginBottom:'-30px',marginRight:'-22px',zIndex:'100',position:'relative'}}>
 {''}&#8358;{value.balance}</Button>
</span>
  {/* cover photo */}
  
  <Image src={newImage||`http://localhost:3001/uploads/${value.image}`}
   style={{width:'100%', height:'250px',filter:'blur(5px)',zIndex:'10'}} fluid />

              
</div>
</Row>
            {/* profile photo */}
          <Row style={{marginTop:'-160px'}}>
          <div className="profile-picture">
            {/* if there's no image in the database and gender is male */}
            {!value.image && value.gender==='male' && (
 <Image
 src={newImage ||  `images/maleicon.jpeg`}
 alt="Profile2 "
 roundedCircle
 className="profile-image"
/>
            )}

                {/* if there's no image in the database and gender is female */}
            
            { !value.image && value.gender==='female' &&(
              <Image
 src={newImage ||  `images/femaleicon.png`}
 alt="Profile1 "
 roundedCircle
 className="profile-image"
/>
               )}
                   {/* if there's image in the database*/}
            {value.image && (
              <Image
                src={newImage||`http://localhost:3001/uploads/${value.image}`}
                alt="Profile "
                roundedCircle
                className="profile-image"
              />
            )}
             
              <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        id="profilePictureInput"
      />
              <div className="edit-icon" onClick={changePicture}>
                <BsPencil size={24} />
              </div>
              


            </div>
         
            
      
          
  
</Row>

<br/>

{errorMessage && <Alert variant="danger"  dismissible>
  <p>{errorMessage}</p>
        
      </Alert>}
     </div>   <hr/> 
     <div style={Top2Style}>
      
     <Tabs/>
      
      </div>
      
          </div>
          
          ))}


      </Container>
    </div>
  )
}

export default Profile
