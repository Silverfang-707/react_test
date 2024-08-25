import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://nishanth-mnjsc1am3-abineshs-projects-53721ee9.vercel.app/bfhl', parsedInput); // Replace with actual backend API URL
      setResponse(res.data);
    } catch (error) {
      console.error('Invalid JSON or API Error:', error);
    }
  };

  const handleOptionClick = (value) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter(option => option !== value);
      } else {
        return [...prevSelected, value];
      }
    });
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Input</h1>

      {/* Single JSON Input */}
      <input 
        type="text" 
        value={jsonInput} 
        onChange={(e) => setJsonInput(e.target.value)} 
        placeholder='Enter JSON'
        style={{ marginBottom: '10px', width: '300px', padding: '8px', fontSize: '16px' }} // Reduced width
      />

      {/* Submit Button */}
      <button 
        onClick={handleSubmit} 
        style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '10px 20px', 
          fontSize: '16px', 
          border: 'none', 
          cursor: 'pointer',
          marginBottom: '10px',
          display: 'block' // Ensure it takes a new line
        }}
      >
        Submit
      </button>

      {/* Multi-Filter Dropdown */}
      <div 
        style={{ 
          position: 'relative', 
          width: '200px', // Smaller input box
          marginBottom: '20px'
        }}
      >
        <input 
          type="text" 
          placeholder="Select Filters" 
          onClick={toggleDropdown} 
          readOnly 
          value={selectedOptions.join(', ')} // Display selected options
          style={{ 
            width: '100%', 
            padding: '8px', 
            fontSize: '16px', 
            cursor: 'pointer'
          }}
        />
        {isDropdownOpen && (
          <div 
            style={{ 
              position: 'absolute', 
              width: '100%', 
              backgroundColor: 'white', 
              border: '1px solid #ccc', 
              zIndex: '1000'
            }}
          >
            <div 
              style={{ padding: '8px', cursor: 'pointer' }} 
              onClick={() => handleOptionClick('alphabets')}
            >
              Alphabets
            </div>
            <div 
              style={{ padding: '8px', cursor: 'pointer' }} 
              onClick={() => handleOptionClick('numbers')}
            >
              Numbers
            </div>
            <div 
              style={{ padding: '8px', cursor: 'pointer' }} 
              onClick={() => handleOptionClick('highest_lowercase')}
            >
              Highest Lowercase Alphabet
            </div>
          </div>
        )}
      </div>

      {/* Display Filtered Response */}
      {response && (
        <div style={{ marginTop: '20px' }}>
          {selectedOptions.includes('alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
          {selectedOptions.includes('numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
          {selectedOptions.includes('highest_lowercase') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
