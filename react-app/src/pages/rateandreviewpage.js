import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import RateAndReview from "../components/rateandreview/rateandreview";

class RateAndReviewPage extends Component{

    render(){
        return(
            <>
            <Headerbanner/>
            <RateAndReview/>
            <Footer/>
            </>
        )
    }
}
export default RateAndReviewPage;