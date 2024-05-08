import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import RecentActions from "../components/recentactions/recentactions";
import SellerListings from "../components/sellerlistings/sellerlistings";

class SellerHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <SellerListings/>
            <RecentActions/>
            <Footer/>
            </>
        )
    }
}
export default SellerHomePage;

