import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import PTPopup from "../components/createptpopup/createptpopup";
import SearchUserAccount from "../components/searchUserAccount/searchUserAccount"

class SAHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <SearchUserAccount/>
            <PTPopup/>
            <Footer/>
            </>
        )
    }
}
export default SAHomePage;