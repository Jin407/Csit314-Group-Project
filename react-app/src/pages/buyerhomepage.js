import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import MyFavourites from "../components/myfavourites/myfavourites";
import BuyerSearch from "../components/buyersearch/buyersearch";

class BuyerHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <MyFavourites/>
            <BuyerSearch/>
            <Footer/>
            </>
        )
    }
}
export default BuyerHomePage;