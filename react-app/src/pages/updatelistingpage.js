
import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import UpdateListing from "../components/REAmylistings/updatelisting";

class UpdateListingPage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <UpdateListing/>
            <Footer/>
            </>
        )
    }
}
export default UpdateListingPage;