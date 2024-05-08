import './profiletable.css';
import { useState, useEffect } from 'react';

const SearchUserAccount = () => {
  const [searchInput, setSearchInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value); // Update searchInput state with the typed value
    setErrorMessage(''); 
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
        try {
            const success = await searchAccount(searchInput);
            if (success) {
                window.location.href = `/profilepage/${searchInput}`;
            } else {
                setErrorMessage('User not found');
            }
        } catch (error) {
            console.error('Error searching for account:', error);
            setErrorMessage('Error searching for account');
        }
    }
  };
  //For search for user account user story
  const searchAccount = async (username) => {
    try {
      // Make API call to fetch user data
      const response = await fetch('http://127.0.0.1:5000/api/search-user-account', {
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
      
      return responseData.success;

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  return (
    <>
    <div className="searchWrapper">
      <div className="searchBarContainer">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by username..."
        />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    </div>
    </>
  );
};

export default SearchUserAccount;
