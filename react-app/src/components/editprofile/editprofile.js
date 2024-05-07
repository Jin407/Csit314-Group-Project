import { Component, useState, useEffect } from "react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import './editprofile.css';

//should be placed in a class
/*
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
            const response = await fetch('http://127.0.0.1:5000/api/update-user-details', {
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
*/

class EditProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            newPassword: '',
            cnewPassword: '',
        };
    }

    componentDidMount() {
        const username = window.location.href.split('/')[4];
        this.setState({ username });
    }

    updateAccount = async (username,newPassword,cnewPassword) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/update-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, newPassword,cnewPassword})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData.success;
        } catch (error) {
            console.error('Error updating account:', error);
            return null;
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, newPassword, cnewPassword } = this.state;
        if(newPassword != cnewPassword){
            this.setState({ createAccountmessage: "Passwords do not match"});
            return;
        }

        const success = await this.updateAccount(username,newPassword, cnewPassword);
        console.log("1) username: " + username + "    2) password: " + newPassword + "    3) cpassword: " + cnewPassword)

        if (success) {
            this.setState({ createAccountmessage: "Account successfully updated" });
        }else{
            this.setState({ createAccountmessage: "Error updating account" });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log("Selected value:", value);
        this.setState({ [name]: value });
    };

    render(){
        return(
            <>
                <div>
                    <form className="updateAccTextArea" onSubmit={this.handleSubmit}>
                        <div className="loginTextBoxes">
                            <p className="loginText">New Password:</p>
                            <input type="password" name="newPassword" value={this.state.newPassword} placeholder="Password" className="loginTextBox" onChange={this.handleInputChange}/>
                        </div>
                        <div className="loginTextBoxes">
                            <p className="loginText">Confirm New Password:</p>
                            <input type="password" name="cnewPassword" value={this.state.cnewPassword} placeholder="Password" className="loginTextBox" onChange={this.handleInputChange}/>
                        </div>
                        <div className="preLoginAdditionalFunctions">
                            <Link to='/sahomepage'></Link><input type="submit" value="Update" className="loginSubmit"/>
                        </div>
                        <p className="createAccountmessage">{this.state.createAccountmessage}</p>
                    </form>
                </div>
            </>
        )
    }


}

export default EditProfile;