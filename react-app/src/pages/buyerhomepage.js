import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import MyFavourites from "../components/myfavourites/myfavourites";

class BuyerHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <MyFavourites/>
            <Footer/>
            </>
        )
    }
}
export default BuyerHomePage;