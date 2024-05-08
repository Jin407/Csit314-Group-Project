import { Component } from "react";
import './mortgagecalculator.css';

class MortgageCalculator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            monthlyPayment: '',
            loanamnt: '',
            intrate: '',
            numOfYears: '',
        };
        // Bind handleCalculation method to the component instance
        this.handleCalculation = this.handleCalculation.bind(this);
    }

    handleCalculation = (event) => {
        event.preventDefault(); // Prevent form submission
        const { loanamnt, intrate, numOfYears } = this.state;
        let monthlyPayment = '';

        if (loanamnt === ''){
            monthlyPayment = "Please key in a loan amount"
            this.setState({ monthlyPayment });;
        } else if (numOfYears === ''){
            monthlyPayment = "Please key in the number of years";
            this.setState({ monthlyPayment });
        } else if (intrate === ''){
            monthlyPayment = "Please key in the interest rate";
            this.setState({ monthlyPayment });
        } else {
        // Convert interest rate to decimal and number of years to months
        const monthlyRate = parseFloat(intrate) / 100 / 12;
        const numOfMonths = parseFloat(numOfYears) * 12;
    
        // Calculate monthly payment
        let monthlyPayment = (parseFloat(loanamnt) * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numOfMonths));
    
        // Format monthly payment to display only two decimal places
        monthlyPayment = parseFloat(monthlyPayment.toFixed(2));
        monthlyPayment = "$" + monthlyPayment;
        this.setState({ monthlyPayment });
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render(){
        return(
            <>
            <div className="mortgagecalculatorarea">
                <h1>Mortgage Calculator</h1>
            <form onSubmit={this.handleCalculation}>
                <div className="morgagecalculatorinput"><label className="morgagecalculatorlabel">Loan Amount: </label><input type="text" name="loanamnt" value={this.state.loanamnt} onChange={this.handleInputChange} placeholder="Loan Amount"/></div>
                <div className="morgagecalculatorinput"><label className="morgagecalculatorlabel">Number of Years: </label><input type="text" name="numOfYears" value={this.state.numOfYears} onChange={this.handleInputChange} placeholder="Number of years"/></div>
                <div className="morgagecalculatorinput"><label className="morgagecalculatorlabel">Interest Rate: </label><input type="text" name="intrate"  value={this.state.intrate} onChange={this.handleInputChange} placeholder="Interest Rate in %"/></div>
                <div className="morgagecalculatorinput"><label className="morgagecalculatorlabel">Monthly Payment:</label>{this.state.monthlyPayment}</div>
                <input type="submit" value="Calculate Monthly Payment" className="morgagecalculatorbutton"/>
            </form>
            </div>
            </>
        )
    }
    
}

export default MortgageCalculator;