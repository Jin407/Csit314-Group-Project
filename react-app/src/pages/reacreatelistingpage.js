import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import CreateListing from "../components/REAmylistings/reacreatelistings";

class REACreateListingPage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <CreateListing/>
            <Footer/>
            </>
        )
    }
}
export default REACreateListingPage;