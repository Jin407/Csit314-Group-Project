import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import PTPopup from "../components/createptpopup/createptpopup";

class SAHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <PTPopup/>
            <Footer/>
            </>
        )
    }
}
export default SAHomePage;