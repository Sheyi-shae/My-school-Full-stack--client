import React,{useState,} from 'react';
import Nav from 'react-bootstrap/Nav';

import About from '../profile-components/About';
import ProfilePosts from '../profile-components/ProfilePosts';
import Activities from '../profile-components/Activities';

function Tabs() {
  const [activeTab, setActiveTab] = useState('Info'); //for holdind active navs or tabs
 
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Nav className='Nav-font' variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={() => handleTabClick('Info')} active={activeTab === 'Info'}>Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={() => handleTabClick('Posts')} active={activeTab === 'Posts'}>Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={() => handleTabClick('Activities')} active={activeTab === 'Activities'}>Activities</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === 'Info' && (
              // Render info Content
              <div >
               <About/>
              </div>
            )}

            {activeTab === 'Posts' && (
              // Render Post Content
              <div>
               <ProfilePosts/>
              </div>
            )}
            {activeTab === 'Activities' && (
              // Render Activities Content
              <div>
               <Activities/>
              </div>
            )}

    
    </div>
  );
}

export default Tabs;
