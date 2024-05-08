import React, { useState, useEffect } from 'react';
import ProfileTable from '../profiletable/profiletable';
import './createptpopup.css';

// Popup Form component
const PopupForm = ({ onSubmit, onClose }) => {
  const [profileName, setProfileName] = useState('');
  //for create user profile user story
  const createProfile = async (profileName) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/create-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({profileName})
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        return responseData.success;
    } catch (error) {
        console.error('Error logging in:', error);
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(profileName)
    onSubmit(profileName);
    setProfileName(''); // Clear input after submission
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={onClose}></span>
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Enter profile name"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

// component
const PTPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState('');
  const [profileTables, setProfileTables] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserTypes(); // Fetch user types when component mounts
  }, []); // Run only once on component mount   

  const fetchUserTypes = async () => {
    try {
      // Make API call to fetch user types
      const response = await fetch('http://127.0.0.1:5000/api/display-user-types');
      if (!response.ok) {
        throw new Error('Failed to fetch user types');
      }
      const userTypes = await response.json();
      
      // Create profile tables for each unique user type
      const tables = userTypes.map((type, index) => (
        <ProfileTable key={index} userType={type} />
      ));
      setProfileTables(tables);
    } catch (error) {
      console.error('Error fetching user types:', error);
    }
  };
  
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (name) => {
    setUserType(name);
    setProfileTables([...profileTables, <ProfileTable key={name} userType={name} />]);
    closePopup();
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Update searchInput state with the typed value
    setMessage(''); 
  };

  return (
    <div>
      <div className="searchWrapper">
        <div className="searchBarContainer">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by profile..."
          />
        </div>
      </div>
      {/* Render the ProfileTables */}
      {profileTables.filter(table => table.props.userType.toLowerCase().includes(searchInput.toLowerCase())).map((table, index) => (
        <div key={index}>{table}</div>
      ))}

      {/* Render the popup form conditionally */}
      {showPopup && <PopupForm onSubmit={handleSubmit} onClose={closePopup} />}
      
      {/* Button to open the popup form */}
      <button className="createProfileTableButton"onClick={openPopup}>Create Profile Table</button>
      {/* Render the search bar */}
      
    </div>
  );
};

export default PTPopup;