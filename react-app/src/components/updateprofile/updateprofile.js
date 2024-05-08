import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './createdynamicaccount.css';

const UpdateProfile = () => {
    const { userType } = useParams();

    const [data, setData] = useState('');
    const [profileName, setProfilename] = useState('');
    const [requirements, setRequirements] = useState('');
    const [updateprofileMessage, setUpdateProfileMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData.message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const updateProfile = async (profileName,requirements,userType) => {
        try {
          // Make API call to fetch user data
          const response = await fetch('http://127.0.0.1:5000/api/update-user-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ profileName,requirements,userType })
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
      
          const responseData = await response.json();
          return responseData.success
    
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const success = await updateProfile(profileName,requirements,userType);
        if (success) {
            setUpdateProfileMessage("Profile successfully updated");
        } else {
            setUpdateProfileMessage("Error updating profile");
        }
        
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'profileName') {
            setProfilename(value);
        } else if (name === 'requirements') {
            setRequirements(value);
        }
    };

    return (
        <div className="caArea">
            <div className="caModule">
                <p className="preLoginHeader">Update profile</p>
                <form className="caTextArea" onSubmit={handleSubmit}>
                    Selected profile: {userType}
                    <div className="caTextBoxes">
                        <p className="caText">New Profile name:</p>
                        <input type="text" value={profileName} onChange={handleInputChange} name="profileName" placeholder="profile name" className="caTextBox"/>
                    </div>
                    <div className="caTextBoxes">
                        <p className="caText">Requirements:</p>
                        <input type="text" value={requirements} onChange={handleInputChange} name="requirements" placeholder="requirements" className="caTextBox"/>
                    </div>
                    <div className="preLoginAdditionalFunctions">
                        <input type="submit" value="Update profile" className="caSubmit"/>
                    </div>
                    <p className="createAccountmessage">{updateprofileMessage}</p>
                    
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;