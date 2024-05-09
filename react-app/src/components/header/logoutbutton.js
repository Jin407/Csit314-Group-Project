import { Component } from "react";

class LogoutButton extends Component{
    logout(){
        window.location.href = `/`;
    }

    render(){
        return(
            <>
            <button onClick={this.logout} className="logoutbutton">LOGOUT</button>
            </>
        )
    }
}

export default LogoutButton;