import React, { Component } from "react";
import Login from "../components/login/login";

class LoginPage extends Component{
    render(){
        return(
            <>
                <div className="loginpagebackground">
                    <Login/>
                </div>
            </>
        )
    }
}

export default LoginPage;