import React, { Component } from "react";
import Headerbanner from "../components/header/header";
import AccountDetails from "../components/accountdetails/accountdetails";
import Footer from "../components/footer/footer";
import RecentActions from "../components/recentactions/recentactions";

class ProfilePage extends Component{
    render(){
        return(
            <>
                <Headerbanner/>
                <AccountDetails/>
                <RecentActions/>
                <Footer/>
            </>
        )
    }
}

export default ProfilePage;