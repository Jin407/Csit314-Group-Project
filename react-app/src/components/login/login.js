import './login.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';


//class name needs to change to login view
class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            username: '',
            password: '',
            userType: 'sysadmin',
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

    login = async (userType, username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userType, username, password })
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
        const { userType, username, password } = this.state;
        const message = await this.loginController.login(userType, username, password);
        //console.log("1) username: " + username + "    2) password: " + password + "    3) userType: " + userType)
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
            <div className="loginArea">
                <div className="loginModule">
                    <p className="preLoginHeader">LOG IN</p>
                    <form className="loginTextArea" onSubmit={this.handleSubmit}>
                        Select account type: 
                        <div className="loginFlexBox">
                            <label className="loginFlexItem"><input type="radio" name="userType" value="Buyer" checked={this.state.userType === 'Buyer'} onChange={this.handleInputChange}/>Buyer</label>
                            <label className="loginFlexItem"><input type="radio" name="userType" value="Seller" checked={this.state.userType === 'Seller'} onChange={this.handleInputChange}/>Seller</label> 
                            <label className="loginFlexItem"><input type="radio" name="userType" value="REA" checked={this.state.userType === 'REA'} onChange={this.handleInputChange}/>REA</label>
                        </div>
                        <div className="loginTextBoxes">
                            <p className="loginText">Username:</p>
                            <input type="text" name="username" value={this.state.username} placeholder="Username" className="loginTextBox" onChange={this.handleInputChange}/>
                            <p className="loginText">Password:</p>
                            <input type="password" name="password" value={this.state.password} placeholder="Password" className="loginTextBox" onChange={this.handleInputChange}/>
                        </div>
                        <div className="preLoginAdditionalFunctions">
                            <Link to='/createaccountpage' className="calink">Create Account</Link>
                            <Link to='/sahomepage'><input type="submit" value="Login" className="loginSubmit"/></Link>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
}

export default Login;