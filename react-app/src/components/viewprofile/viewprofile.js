import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './createdynamicaccount.css';

const ViewProfile = () => {
    const { userType } = useParams();

    const [data, setData] = useState({
        profileName: '',
        requirements: '',
        createdAt: ''
    });

    useEffect(() => {
        viewProfile(userType);
    }, []);

    const viewProfile = async (userType) => {
        console.log(userType)
        try {
          // Make API call to fetch user data
          const response = await fetch('http://127.0.0.1:5000/api/view-profile-details', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userType })
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
      
          const userData = await response.json();
          console.log('Received user data:', userData);
          setData({
                profileName: userData[0][0],
                requirements: userData[0][1],
                createdAt: userData[0][2]
          });
    
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    return (
        <div className="accountdetails">
                <table className="accountdetailstable"> 
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Profile: </td>
                        <td className="accountdetailcolumn2">{data.profileName}</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Requirements: </td>
                        <td className="accountdetailcolumn2">{data.requirements}</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Profile Created: </td>
                        <td className="accountdetailcolumn2">{data.createdAt}</td>
                    </tr>
                </table>
            </div>
    );
};

export default ViewProfile;