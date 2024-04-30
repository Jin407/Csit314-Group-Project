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
  }, []);

  const fetchUsers = async () => {
    try {
      // Make API call to fetch user data
      const response = await fetch('your-api-endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      // Update state with the fetched user data
      setUsers(userData);
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

  const renderMenu = (username) => (
    <Menu>
      <Menu.Item key={`view-${username}`}>{renderViewAccountLink(username)}</Menu.Item>
      <Menu.Item key={`update-${username}`}>{renderUpdateAccountLink(username)}</Menu.Item>
      <Menu.Item key={`suspend-${username}`}>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">Suspend account</a>
      </Menu.Item>
      <Menu.Item key={`reactivate-${username}`} disabled>
        Reactivate account (disabled)
      </Menu.Item>
      <Menu.Item key={`delete-${username}`} danger>
        Delete account
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
                <td>{user.registerDate}</td>
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
            <tr>
                <td>userAcc1</td>
                <td>12 Mar 2024</td>
                <td>Active</td>
                <td>
                  <Dropdown overlay={renderMenu("userAcc1")}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      Actions <DownOutlined />
                    </a>
                  </Dropdown>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileTable;
