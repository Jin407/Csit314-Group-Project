import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import ListingView from "../components/REAmylistings/listingview";

class ViewListingPage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <ListingView/>
            <Footer/>
            </>
        )
    }
}
export default ViewListingPage;