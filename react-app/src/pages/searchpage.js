import React, {Component, useState} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";

class SearchPage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            {/*<Search/>*/}
            <Footer/>
            </>
        )
    }
}
export default SearchPage;