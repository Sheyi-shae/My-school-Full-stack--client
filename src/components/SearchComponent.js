import React, { useState } from 'react';
import axios from 'axios';
import { InputGroup,Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'


function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching]=useState(false)

  const navigate=useNavigate();
  const handleChange = async (e) => {
    const newQuery = e.target.value;
    setIsSearching(true);
    setQuery(newQuery);

    if(newQuery===''){
      setIsSearching(false);
      setResults([]);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/topics/search', {
        params: { query: newQuery }
      });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>


      <InputGroup className="mb-3">
        <Form.Control
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2" className='btn btn-primary'>Search Everywhere</InputGroup.Text>
      </InputGroup>
      {isSearching ? ( 
        
      <div className='results' style={{ maxHeight: 'calc(100vh -180px)'}}>
      
          {results.length > 0 ? (
  results.map((post) => (
    
      <div className='titleSearch' key={post.id}  onClick={() => navigate(`/forums/fd/${post.id}`)} >
        <p  >{post.topic}
        </p>
        
    </div>
    ))
    
    ) : (
      <>
      <p >No results.</p>
      
      </>
    )}
    
</div>):(
  <div></div>
)}
<hr/>
    </div>
  );
}


export default SearchComponent;
