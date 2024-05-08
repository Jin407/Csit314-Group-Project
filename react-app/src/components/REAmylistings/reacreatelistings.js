import { Component } from "react";
import './realistings.css';

class CreateListing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            address:"",
            price:"",
            sellerusername:"",
            reausername:"",
        };
    }

    componentDidMount() {
        this.state.reausername = window.location.href.split('/')[4];
        
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { address, price, sellerusername, reausername } = this.state;
        console.log(reausername)
        const success= await this.createListing(address, price, sellerusername, reausername);
        console.log("1) address: " + address + "    2) price: " + price + "    3) sellerusername: " + sellerusername + "    4) reausername: " + reausername)
    
    };

    createListing = async (address, price, sellerusername, reausername) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/create-property-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address, price, sellerusername, reausername })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            console.error('Error creating listing:', error);
            
        }
    };

    render(){
        return(
            <>
            <div className="createlistingarea">
                <h2>Create Listings</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Address: </label><input type="text" name="address" value={this.state.address} placeholder="Address" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <label>Enter Price: </label><input type="text" name="price" value={this.state.price} placeholder="Price" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <label>Enter Seller Username: </label><input type="text" name="sellerusername" value={this.state.sellerusername} placeholder="Seller Username" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <input type="submit" value="Create Listing"/>
                    <p className="Message">{this.state.Message}</p>
                </form>
            </div>
            </>
        )
    }
}

export default CreateListing;