import { Component, useState, useEffect } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import './editprofile.css';

const EditProfile = () => {

    const { username } = useParams();
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');

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

    const updatePassword = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData.message;
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updatePassword();
        console.log("1) username: " + username + "    2) password: " + password);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    };
    
        return(
            <>
                <div>
                    <form className="updateAccTextArea" onSubmit={handleSubmit}>
                        <div className="loginTextBoxes">
                            <p className="loginText">Password:</p>
                            <input type="password" name="password" value={password} placeholder="Password" className="loginTextBox" onChange={handleInputChange}/>
                        </div>
                        <div className="preLoginAdditionalFunctions">
                            <Link to='/sahomepage'><input type="submit" value="Login" className="loginSubmit"/></Link>
                        </div>
                    </form>
                </div>
            </>
        )
    
}

export default EditProfile;