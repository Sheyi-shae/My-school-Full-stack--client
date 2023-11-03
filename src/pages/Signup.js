import React, { useState } from 'react';
import '../App.css';
import { Formik, Field, ErrorMessage,useFormikContext } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { BsUpload, BsEye, BsEyeSlash } from 'react-icons/bs';
import {Form,Col,InputGroup,Row,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup({ closeModal }) { //for closing the signupModal
  
  const [lgShow, setLgShow] = useState(false);

// Show password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
    // End show password
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
//sate and city dependent select menu
const [dependentSelect, setdependentSelect] = useState({state: '',city: ''});

//states to render
  const states = [
    { id: 'kwara', name: 'Kwara' },
    { id: 'oyo', name: 'Oyo' },
    { id: 'ogun', name: 'Ogun' }
  ];
// cities to render after state selection
  const cities = {
    kwara: ['Ilorin', 'Offa', 'Ijagbo', 'Omu-Aran'],
    oyo: ['Ibadan', 'Ogbomosho', 'Oyo Town'],
    ogun: ['Ijebu Ode', 'Ilaro', 'Abeokuta']
  };

 

  const handleStateChange = (event) => {
    const selectStateId = event.target.value;
    setdependentSelect({ ...dependentSelect, state: selectStateId, city: '' });
   
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setdependentSelect({ ...dependentSelect, city: selectedCity });
    
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
  };
  //image
  
  
  
  

  

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    city: '',
    state: '',
    date:'',
    password: '',
    confirmPassword: '',
    image: null,
    terms: false,
    gender: '',
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(3, 'Invalid First name').max(20, 'Invalid First name'),
    lastName: yup.string().required('Last name is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    gender: yup.string().required('City is required'),
    username: yup.string().required('Username is required'),
    
    date: yup.date().min(new Date('1998-01-01'),'You are too young').required('Date of Birth is required'),
  
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required').min(5, 'Password should be at least 5 characters long').max(20, 'Password should not exceed 20 characters'),
    confirmPassword: yup.string().required('Please confirm your password').oneOf([yup.ref('password'), null], 'Passwords must match'),
   
});

  const navigate = useNavigate();

  
  const onSubmit = async (data, { setSubmitting }) => {
    try {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      const formData = new FormData();
formData.append('firstName', data.firstName);
formData.append('lastName', data.lastName);

formData.append('state', data.state);
formData.append('date', data.date);
formData.append('city', data.city);
formData.append('gender', data.gender);
formData.append('username', data.username);
formData.append('email', data.email);
formData.append('password', data.password);
formData.append('confirmPassword', data.confirmPassword);
formData.append('terms', data.terms);
formData.append('image', selectedFile);
  
      const response = await axios.post('http://localhost:3001/auth', formData);
  


  
      console.log(response);
      setSuccessMessage('Registration successful');
      setLgShow(true); // Show the modal
      setTimeout(() => {
        setSubmitting(false);
        setLoading(false);
        setSuccessMessage('');
        closeModal(); // Call the closeModal function passed from SignupModal to close SignupModal after successful reg
      }, 2000);
      
  
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        // Handle other errors here
      }
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className='createPostPage'>
          

            {/* Display success message */}
            {lgShow && (
  <Alert variant='success' dismissible onClose={() => setLgShow(false)}>
    {successMessage}
  </Alert>
)}


            {/* Display error message */}
            {errorMessage && (
              <Alert variant='danger' dismissible onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            )}
 
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setErrorMessage('');
          setSuccessMessage('');
          setLoading(true);
          onSubmit(values, actions);
        }}// Pass the onSubmit function here
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting}) => (
          
          <Form noValidate onSubmit={handleSubmit}>

            <h5 className='text-primary'>Student Information</h5>
          
            <hr />
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Field
                  type="text"
                  name="firstName"
                  className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`}
                />
                
                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Field
                  type="text"
                  name="lastName"
                  className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
              </Form.Group>

              
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="validationFormik104">
                <Form.Label>State</Form.Label>
                 <Field
                  as="select"
                  name="state"
                  value={dependentSelect.state}
                  onChange={(event) => {
                    handleStateChange(event);
                    handleChange(event); // Update Formik value for state
                  }}
                  className={`form-select ${touched.state && errors.state ? 'is-invalid' : ''}`}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="state" component="div" className="invalid-feedback" />
              </Form.Group>
              {/* if the state is selected, display this */}
              {dependentSelect.state &&(
              <Form.Group as={Col} md="5" controlId="validationFormik02">
                <Form.Label>City</Form.Label>
               
                <Field
                  as="select"
                  name="city"
                  value={dependentSelect.city}
                  onChange={(event) => {
                    handleCityChange(event);
                    handleChange(event); // Update Formik value for city
                  }}
                  className={`form-select ${touched.city && errors.city ? 'is-invalid' : ''}`}
                >
                  <option value="">Select City</option>
                  { cities[dependentSelect.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="city" component="div" className="invalid-feedback" />
              </Form.Group>)}
              <Form.Group as={Col} md="4" controlId="validationFormikGender">
                <Form.Label>Gender</Form.Label>
                <Field
                  as="select"
                  name="gender"
                  className={`form-select ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="invalid-feedback" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormikDateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Field
                  type="date"
                  name="date"
                  className={`form-control ${touched.date&& errors.date ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="date" component="div" className="invalid-feedback" />
              </Form.Group>
            </Row>

            <h5 className='text-primary'>Login Credentials</h5>
            <hr />
            <Row className="mb-3">
            <Form.Group as={Col} md="5" controlId="validationFormikUsername2">
    <Form.Label>Username</Form.Label>
    <InputGroup hasValidation>
      <InputGroup.Text id="inputGroupPrepend" className='mybtn'>@</InputGroup.Text>
      <Field
        type="text"
        name="username"
        placeholder="Username"
        aria-describedby="inputGroupPrepend"
        className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`}
      />
      <ErrorMessage name="username" component="div" className="invalid-feedback" />
    </InputGroup>
  </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationFormikPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility}>
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </InputGroup.Text>
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5">
                <Form.Label>Confirm Password</Form.Label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
              </Form.Group>
            </Row>

            <Form.Group as={Col} md='4' controlId='validationFormikImage'>
                <Form.Label>Image [Optional]</Form.Label>
                <InputGroup hasValidation>
                  <Field
                    type='file'
                    required
                    id='image'
                    name='image'
                    onChange={(event) => {
                      handleFileChange(event);
                      handleChange(event);
                    }}
                    className={`form-control visually-hidden ${touched.image && errors.image ? 'is-invalid' : ''}`}
                  />
                  <label htmlFor='image' className='btn btn-file-upload mybtn'>
                    <BsUpload className='me-2' />
                    {selectedFile ? 'Change Image' : 'Choose Image'}
                  </label>
                  <ErrorMessage name='image' component='div' className='invalid-feedback' />
                </InputGroup>
                {selectedFile && (
                  <div className='mt-2'>
                    <img src={URL.createObjectURL(selectedFile)} alt='Selected' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </div>
                )}
              </Form.Group>
              <br/>
              {/* Display error message */}
            {errorMessage && (
              <Alert variant='danger' dismissible onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            )}
             {/* Display success message */}
             {successMessage && (
              <Alert variant='success' dismissible onClose={() => setSuccessMessage('')}>
                {successMessage}
              </Alert>
            )}

           <center>  <Button className='mybtn' type='submit' disabled={isSubmitting || loading}>
    {loading ? 'Please Wait..' : 'Sign up'}
  </Button></center>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;