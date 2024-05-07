import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import REAMyListings from "../components/REAmylistings/reamylistings";
import ViewRandR from "../components/REAviewRandR/viewRandR";

class REAHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <REAMyListings/>
            <ViewRandR/>
            <Footer/>
            </>
        )
    }
}
export default REAHomePage;