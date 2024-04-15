import './login.css';

function Login(){


    return(
        <>
        <div className="loginArea">
            <div className="loginModule">
                <p className="preLoginHeader">LOG IN</p>
                <form className="loginTextArea">
                    Select account type: 
                    <div className="loginFlexBox">
                        <label className="loginFlexItem"><input type="radio" value="buyer" checked={true} />Buyer</label>
                        <label className="loginFlexItem"><input type="radio" value="seller" />Seller</label>
                        <label className="loginFlexItem"><input type="radio" value="agent" />REA</label>
                    </div>
                    <div className="loginTextBoxes">
                        <p className="loginUsernameText">Username:</p>
                        <input type="text" name="username" placeholder="Username" className="loginTextBox"/>
                        <p className="loginPasswordText">Password:</p>
                        <input type="text" name="password" placeholder="password" className="loginTextBox"/>
                    </div>
                    <label>login</label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
        </>
    )
}



export default Login;