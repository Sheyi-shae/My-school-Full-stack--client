import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Image, Alert,Button } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import { formatDistanceToNow, } from 'date-fns';
import { FaUserClock } from 'react-icons/fa';
import ChangePassword  from "../components/ChangePassword";

function About() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: {
            accessToken: localStorage.getItem('accessToken'),
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProfile();
  }, []);

  const profileDetailStyle = {
    fontSize: '14px',
    border: '1px solid #ccc',
  };

  return (
    <Container>
      {profile.map((value) => (
        <div className="post" key={value.id}>
          <div style={{ boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', background: 'white', padding: '20px', borderRadius: '10px' }}>
            <Row>
              <Col xs={4} md={5}>
                <div>
                  <b style={profileDetailStyle}>First Name</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{value.firstName}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>Last Name</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{value.lastName}</span>
                </div>
                
                <div>
                  <b style={profileDetailStyle}>Date of Birth</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{format(new Date(value.date), 'MMMM dd, yyyy')}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>Age</b>
                  <br />
                  <span>{formatDistanceToNow(new Date(value.date)) + ' old'}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>Email</b>
                  <br />
                  <span>{value.email}</span>
                </div>
              </Col>
              <Col xs={7} md={7}>
               
                <div>
                  <b style={profileDetailStyle}>Username</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>@{value.username}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>State</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{value.state}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>City</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{value.city}</span>
                </div>
                <div>
                  <b style={profileDetailStyle}>Gender</b>
                  <br />
                  <span style={{ textTransform: 'capitalize' }}>{value.gender}</span>
                </div>
              </Col>
            </Row>
            <hr />
            <div>
              <p>
                <FaUserClock /> Registered{' '}
                {formatDistanceToNow(new Date(value.createdAt)) + ' ago'}
              </p>

              <ChangePassword/>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}

export default About;
