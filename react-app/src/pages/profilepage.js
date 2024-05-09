import React, { Component } from "react";
import Headerbanner from "../components/header/header";
import AccountDetails from "../components/accountdetails/accountdetails";
import Footer from "../components/footer/footer";

class ProfilePage extends Component{
    render(){
        return(
            <>
                <Headerbanner/>
                <AccountDetails/>
                <Footer/>
            </>
        )
    }
}

export default ProfilePage;