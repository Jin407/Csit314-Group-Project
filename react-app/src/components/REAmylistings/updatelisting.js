import { Component } from "react";
import './realistings.css';

class UpdateListing extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listingid:"",
            price:"",
            sellerusername:"",
            newaddress:"",
        };
    }

    componentDidMount() {
        this.setState({
            listingid: window.location.href.split('/')[4]
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { listingid, address, price, sellerusername } = this.state;
        const success = await this.updateListing(listingid, address, price, sellerusername);
        console.log("1) address: " + address + "    2) price: " + price + "    3) sellerusername: " + sellerusername + "    4) listingid: " + listingid)
        
    };

    updateListing = async (listingid, address, price, sellerusername) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/update-property-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({listingid, address, price, sellerusername })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            

        } catch (error) {
            console.error('Error updating listing:', error);
            
        }
    };

    render(){
        return(
            <>
            <div className="createlistingarea">
                <h2>Update Listings</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Address: </label><input type="text" name="address" value={this.state.address} placeholder="New Address" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <label>Enter Price: </label><input type="text" name="price" value={this.state.price} placeholder="New Price" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <label>Enter Seller Username: </label><input type="text" name="sellerusername" value={this.state.sellerusername} placeholder="New Seller Username" className="loginTextBox" onChange={this.handleInputChange}></input>
                    <input type="submit" value="Update Listing"/>
                </form>
            </div>
            </>
        )
    }
}

export default UpdateListing;