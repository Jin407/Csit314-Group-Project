import React, { useState, useEffect } from 'react';
import ProfileTable from '../profiletable/profiletable';
import './createptpopup.css';

// Popup Form component
const PopupForm = ({ onSubmit, onClose }) => {
  const [profileName, setProfileName] = useState('');

  const createProfile = async (profileName) => {
    console.log(profileName)
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

  useEffect(() => {
    // Preload three tables with predefined profile names
    setProfileTables([
      <ProfileTable key="Buyer" userType="Buyers" />,
      <ProfileTable key="Seller" userType="Sellers" />,
      <ProfileTable key="REA" userType="Real Estate Agents" />
    ]);
  }, []); // Run only once on component mount  

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


  return (
    <div>
      {/* Render the ProfileTables */}
      {profileTables.map((table, index) => (
        <div key={index}>{table}</div>
      ))}

      {/* Render the popup form conditionally */}
      {showPopup && <PopupForm onSubmit={handleSubmit} onClose={closePopup} />}
      
      {/* Button to open the popup form */}
      <button className="createProfileTableButton"onClick={openPopup}>Create Profile Table</button>
    </div>
  );
};

export default PTPopup;