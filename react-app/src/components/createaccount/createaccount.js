import './createaccount.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';

//class name needs to be change to create Account view
class CreateAccount extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            username: '',
            password: '',
            cpassword: '',
            userType: 'buyer',
        };
    }

    fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData.message;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    //method name need to change to create account, remember to change for createaccount.js when calling this method as well
    login = async (userType, username, password, cpassword) => {
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
            return responseData.message;
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { userType, username, password, cpassword } = this.state;
        const message = await this.createAccountController.login(userType, username, password, cpassword);
        console.log("1) username: " + username + "    2) password: " + password + "    3) cpassword: " + cpassword + "    4) userType: " + userType)
        if (message) {
            this.setState({ data: message });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    render(){
        return(
        <>
        <div className="caArea">
            <div className="caModule">
                <p className="preLoginHeader">CREATE ACCOUNT</p>
                <form className="caTextArea" onSubmit={this.handleSubmit}>
                    Select account type:
                    <div className="caFlexBox">
                        <label className="loginFlexItem"><input type="radio" name="userType" value="buyer" checked={this.state.userType === 'buyer'} onChange={this.handleInputChange}/>Buyer</label>
                        <label className="loginFlexItem"><input type="radio" name="userType" value="seller" checked={this.state.userType === 'seller'} onChange={this.handleInputChange}/>Seller</label> 
                        <label className="loginFlexItem"><input type="radio" name="userType" value="REA" checked={this.state.userType === 'REA'} onChange={this.handleInputChange}/>REA</label>
                    </div>
                    <div className="caTextBoxes">
                        <p className="caText">Username:</p>
                        <input type="text" value={this.state.username} onChange={this.handleInputChange} name="username" placeholder="Username" className="caTextBox"/>
                        <p className="caText">Password:</p>
                        <input type="password" value={this.state.password} onChange={this.handleInputChange} name="password" placeholder="Password" className="caTextBox"/>
                        <p className="caText">Confirm Password:</p>
                        <input type="password" value={this.state.cpassword} onChange={this.handleInputChange} name="cpassword" placeholder="Confirm Password" className="caTextBox"/>
                    </div>
                    <div className="preLoginAdditionalFunctions">
                        <Link to='/' className='loginlink'>Login</Link>
                        <Link to='/ProfilePage'><input type="submit" value="Create Account" className="caSubmit"/></Link>
                    </div>
                </form>
            </div>
        </div>
        </>
        )
    }
    }

export default CreateAccount;