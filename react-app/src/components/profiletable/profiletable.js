import './profiletable.css';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Space } from 'antd';
import { useState, useEffect } from 'react';

const ProfileTable = ({ userType }) => {
  const [submitType, setSubmitType] = useState('');
  const [users, setUsers] = useState([]);

  const handleInputChange = () => {
    
    if (userType === 'Buyers') setSubmitType('buyer');
    else if (userType === 'Sellers') setSubmitType('seller');
    else if (userType === 'Real Estate Agents') setSubmitType('REA');
    else setSubmitType(userType);
    
  };

  useEffect(() => {
    handleInputChange();
  }, []); // Run once on component mount to set the submitType

  useEffect(() => {
    fetchUsers(); // Fetch data when component mounts
  }, [submitType]);


  const fetchUsers = async () => {
    try {
      // Make API call to fetch user data
      const response = await fetch('http://127.0.0.1:5000/api/display-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usertype: submitType })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await response.json();
      console.log('Received user data:', userData);
      // Map the received user data to user objects
      // Directly set the state of users with the mapped user data
      setUsers(userData.map(user => ({
        username: user[0],
        createdAt: new Date(user[1]).toLocaleString(),
        status: user[2]
      })));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const suspendAccount = async (username) => {
    try {
      // Make API call to fetch user data
      const response = await fetch('http://127.0.0.1:5000/api/suspend-user-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const responseData = await response.json();
      
      if(responseData.success){
        window.location.reload()

        return responseData.success
      }else{


        return responseData.success
      };

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const suspendProfile = async (profileName) => {
    try {
      // Make API call to fetch user data
      const response = await fetch('http://127.0.0.1:5000/api/suspend-user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profileName })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const responseData = await response.json();
      
      if(responseData.success){
        window.location.reload()

        return responseData.success
      }else{


        return responseData.success
      };

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const reactivateAccount = async (username) => {
    try {
      // Make API call to fetch user data
      const response = await fetch('http://127.0.0.1:5000/api/reactivate-user-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const responseData = await response.json();
      
      if(responseData.success){
        window.location.reload()

        return responseData.success
      }else{


        return responseData.success
      };

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderViewAccountLink = (username) => (
    <Link to={`/profilepage/${username}`}>View account</Link>
  );

  const renderUpdateAccountLink = (username) => (
    <Link to={`/editprofile/${username}`}>Update account</Link>
  )

  const handleSuspendAccount = (e, username) => {
    e.preventDefault(); // Prevent the default behavior of the anchor element
    suspendAccount(username); // Call the suspendAccount function
  };

  const handleSuspendProfile = (e, profileName) => {
    e.preventDefault(); // Prevent the default behavior of the anchor element
    suspendProfile(profileName); // Call the suspendAccount function
  };

  const handleReactivateAccount = (e, username) => {
    e.preventDefault(); // Prevent the default behavior of the anchor element
    reactivateAccount(username); // Call the reactivateAccount function
  };

  const renderMenu = (username) => (
    <Menu>
      <Menu.Item key={`view-${username}`}>{renderViewAccountLink(username)}</Menu.Item>
      <Menu.Item key={`update-${username}`}>{renderUpdateAccountLink(username)}</Menu.Item>
      <Menu.Item key={`suspend-${username}`}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com" onClick={(e) => handleSuspendAccount(e, username)}>Suspend account</a>
      </Menu.Item>
      <Menu.Item key={`reactivate-${username}`}>
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com" onClick={(e) => handleReactivateAccount(e, username)}>Reactivate account</a>
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      <div className="tableOfProfiles">
        <h2>
          {userType}{' '}
          <Link to={`/sacreateaccountpage/${submitType}`}>
            <button className="PTCreateAccButton">+</button>
          </Link>
          <Link to={`/saupdateprofilepage/${submitType}`}>
            <button className="PTCreateAccButton">✎</button>
          </Link>
          <Link to={`/saviewprofilepage/${submitType}`}>
            <button className="PTCreateAccButton">👁️</button>
          </Link>
          
          <button className="PTCreateAccButton"  onClick={(e) => handleSuspendProfile(e, submitType)}>🗑️</button>
          
        </h2>
        <table className="profilesTable">
          <thead>
            <tr>
              <th className="profileTableColumn1">Username</th>
              <th className="profileTableColumn2">Register Date</th>
              <th className="profileTableColumn3">Status</th>
              <th className="profileTableColumn4">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            <td colSpan={4}>
              <hr className="hr2px" />
            </td>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.createdAt}</td>
                <td>{user.status}</td>
                <td>
                  <Dropdown overlay={renderMenu(user.username)}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      Actions <DownOutlined />
                    </a>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default ProfileTable;
