import { Component } from "react"
import { Link } from "react-router-dom"

class LogoutButton extends Component{
    render(){
        return(
            <>
            <Link to="/"><button className="logoutbutton">LOGOUT</button></Link>
            </>
        )
    }
}

export default LogoutButton;