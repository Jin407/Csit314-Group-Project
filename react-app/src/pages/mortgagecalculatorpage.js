import React, {Component} from "react";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";
import MortgageCalculator from "../components/mortgagecalculator/mortgagecalculator";

class MortgageCalculatorPage extends Component{
    render(){
        return(
            <>
            <div>
                <Headerbanner/>
                <MortgageCalculator/>
                <Footer/>
            </div>
            </>
        )
    }
}

export default MortgageCalculatorPage;