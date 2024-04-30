import React, {Component, useState} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import ProfileTable from "../components/profiletable/profiletable";

class SAHomePage extends Component{
    /*constructor(props) {
        super(props);
        this.state = {
            userType: '',
        };
        //this.createProfileController = new createProfileController(); // Create an instance of CreateProfileController
    }*/

    render(){
        return(
            <>
            <Headerbanner/>
            <label className="profileTableLabel">Real Estate Agents</label>
            <ProfileTable/>
            <label className="profileTableLabel">Sellers</label>
            <ProfileTable/>
            <label className="profileTableLabel">Buyers</label>
            <ProfileTable/>
            <Footer/>
            </>
        )
    }
}
export default SAHomePage;