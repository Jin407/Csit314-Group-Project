import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './createdynamicaccount.css';

const CreateDynamicAccount = () => {
    const { userType } = useParams();

    const [data, setData] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [createAccountMessage, setCreateAccountMessage] = useState('');

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

    const createAccount = async (userType, username, password, cpassword) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userType, username, password, cpassword})
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== cpassword) {
            setCreateAccountMessage("Passwords do not match");
            return;
        }
        const success = await createAccount(userType, username, password, cpassword);
        //console.log("1) username: " + username + "    2) password: " + password + "    3) cpassword: " + cpassword + "    4) userType: " + userType)
        if (success) {
            setCreateAccountMessage("Account successfully created");
        } else {
            setCreateAccountMessage("Username taken");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') setUsername(value);
        else if (name === 'password') setPassword(value);
        else if (name === 'cpassword') setCpassword(value);
    };

    return (
        <div className="caArea">
            <div className="caModule">
                <p className="preLoginHeader">CREATE ACCOUNT</p>
                <form className="caTextArea" onSubmit={handleSubmit}>
                    Selected account type: {userType}
                    <div className="caTextBoxes">
                        <p className="caText">Username:</p>
                        <input type="text" value={username} onChange={handleInputChange} name="username" placeholder="Username" className="caTextBox"/>
                        <p className="caText">Password:</p>
                        <input type="password" value={password} onChange={handleInputChange} name="password" placeholder="Password" className="caTextBox"/>
                        <p className="caText">Confirm Password:</p>
                        <input type="password" value={cpassword} onChange={handleInputChange} name="cpassword" placeholder="Confirm Password" className="caTextBox"/>
                    </div>
                    <div className="preLoginAdditionalFunctions">
                        <input type="submit" value="Create Account" className="caSubmit"/>
                    </div>
                    <p className="createAccountmessage">{createAccountMessage}</p>
                    
                </form>
            </div>
        </div>
    );
};

export default CreateDynamicAccount;
