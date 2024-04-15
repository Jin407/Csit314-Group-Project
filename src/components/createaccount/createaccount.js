import './createaccount.css';

function CreateAccount(){
    return(
        <>
        <div className="caArea">
            <div className="caModule">
                <p className="preLoginHeader">CREATE ACCOUNT</p>
                <form className="caTextArea">
                    Select account type:
                    <div className="caFlexBox">
                        <label className="caFlexItem"><input type="radio" value="buyer" checked={true} />Buyer</label>
                        <label className="caFlexItem"><input type="radio" value="seller" />Seller</label>
                        <label className="caFlexItem"><input type="radio" value="agent" />REA</label>
                    </div>
                    <div className="caTextBoxes">
                        <p className="caUsernameText">Username:</p>
                        <input type="text" name="username" placeholder="Username" className="caTextBox"/>
                        <p className="caPasswordText">Password:</p>
                        <input type="text" name="password" placeholder="password" className="caTextBox"/>
                        <p className="caCPasswordText">Confirm Password:</p>
                        <input type="text" name="cpassword" placeholder="cpassword" className="caTextBox"/>
                    </div>
                    <label>createacc</label>
                    <input type="submit" value="createAccount" />
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateAccount;