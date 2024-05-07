import { Component } from "react";
import BSListing from "./buyersearchlisting";


class BuyerSearch extends Component{

    constructor(props) {
        super(props);
        this.state = {
            status: "Unsold", // Initial status set to "Unsold"
            listings: [], // Initially an empty array, will be populated with data
            filteredListings: [], // For filtered listings based on search and status
            searchInput: '', // State to hold search input
            username:'',
        };
    }

    componentDidMount(){
        this.setState({
            username: window.location.href.split('/')[4]
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSearchChange = event => {
        const { value } = event.target;
        const { listings, status } = this.state;
    
        // Filter listings based on search input and status
        const filteredListings = listings.filter(listing =>
            listing.address.toLowerCase().includes(value.toLowerCase()) &&
            listing.status === status
        );
    
        this.setState({ searchInput: value, filteredListings });
    };

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
    };

    handleFavouriting = async (listingId, username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/favourite-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ listingId, username }) // Submit listingId and username
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonresponse = await response.json(); // Assuming the server returns a boolean value
            return jsonresponse.success;
        } catch (error) {
            console.error('Error favouriting listing:', error);
            return false;
        }
    };
    render(){
        const { searchInput, filteredListings } = this.state;
        return(
            <>
            <div className="searchpagearea">
                <h2>Search for Listing</h2>
                <div className="searchPageFlexBox">
                    <label className="searchPageFlexItem">
                    <input type="radio" name="status" value="Unsold" checked={this.state.status === 'Unsold'} onChange={this.handleInputChange}/>Unsold</label>
                    <label className="searchPageFlexItem">
                    <input type="radio" name="status" value="Sold" checked={this.state.status === 'Sold'} onChange={this.handleInputChange}/>Sold</label> 
                </div>
                <input type="text" value={searchInput} onChange={this.handleSearchChange} placeholder="Search by address..."/>
                <div className="listings-container">
                {filteredListings && filteredListings.map(listing => (
                  <BSListing
                  key={listing.id} 
                  listing={listing} 
                  onView={() => this.handleViewListing(listing.id)}
                  onFavourite={() => this.handleFavouriting(listing.id, this.state.username)} // Access username from state
                />
                ))}
                </div>
            </div>
            </>
        )
    }
}

export default BuyerSearch;