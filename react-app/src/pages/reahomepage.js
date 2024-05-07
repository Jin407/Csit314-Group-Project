import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import REAMyListings from "../components/REAmylistings/reamylistings";

class REAHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <REAMyListings/>
            
            <Footer/>
            </>
        )
    }
}
export default REAHomePage;