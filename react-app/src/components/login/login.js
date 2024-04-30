import './login.css';
import { Component } from 'react';
import loginController from './loginController.js';
import { Link } from 'react-router-dom';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            username: '',
            password: '',
            userType: 'sysadmin',
        };
        this.loginController = new loginController(); // Create an instance of loginController
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const data = await this.loginController.fetchData();
        if (data) {
            this.setState({ data });
        }
    };

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
                            <label className="loginFlexItem"><input type="radio" name="userType" value="buyer" checked={this.state.userType === 'buyer'} onChange={this.handleInputChange}/>Buyer</label>
                            <label className="loginFlexItem"><input type="radio" name="userType" value="seller" checked={this.state.userType === 'seller'} onChange={this.handleInputChange}/>Seller</label> 
                            <label className="loginFlexItem"><input type="radio" name="userType" value="agent" checked={this.state.userType === 'agent'} onChange={this.handleInputChange}/>REA</label>
                        </div>
                        <div className="loginTextBoxes">
                            <p className="loginText">Username:</p>
                            <input type="text" name="username" value={this.state.username} placeholder="Username" className="loginTextBox" onChange={this.handleInputChange}/>
                            <p className="loginText">Password:</p>
                            <input type="password" name="password" value={this.state.password} placeholder="Password" className="loginTextBox" onChange={this.handleInputChange}/>
                        </div>
                        <div className="preLoginAdditionalFunctions">
                            <Link to='/createaccountpage' className="calink">Create Account</Link>
                            <input type="submit" value="Login" className="loginSubmit"/>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
}

export default Login;