import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import MyFavourites from "../components/myfavourites/myfavourites";
import BuyerSearch from "../components/buyersearch/buyersearch";
import RecentActions from "../components/recentactions/recentactions";
import { Link } from "react-router-dom";

class BuyerHomePage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <Link to="/mortgagecalculatorpage" className="gotoMC">Mortgage Calculator</Link>
            <MyFavourites/>
            <RecentActions/>
            <BuyerSearch/>
            <Footer/>
            </>
        )
    }
}
export default BuyerHomePage;