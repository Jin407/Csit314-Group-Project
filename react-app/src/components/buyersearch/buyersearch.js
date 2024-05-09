import { Component } from "react";
import BSListing from "./buyersearchlisting";
import './buyersearch.css';


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
        }, () => {
            this.displayListings(); // Call displayListings after setting the username state
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        let filteredListings = this.state.listings;
    
        // Update state with the new value
        this.setState({ [name]: value }, () => {
            // Filter listings based on search input and status
            filteredListings = filteredListings.filter(listing =>
                listing.address.toLowerCase().includes(this.state.searchInput.toLowerCase()) &&
                (this.state.status === 'Available' ? listing.status === 'Available' : listing.status === this.state.status)
            );
    
            // Update state with filtered listings
            this.setState({ filteredListings });
        });
    };
    
    

    handleSearchChange = () => {
        const { listings, status, searchInput } = this.state;
    
        // Filter listings based on search input and status
        const filteredListings = listings.filter(listing =>
            listing.address.toLowerCase().includes(searchInput.toLowerCase()) &&
            (status === 'Available' ? listing.status === 'Available' : listing.status === status)
        );
    
        this.setState({ filteredListings });
    };

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
    };

    displayListings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/display-all-property-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listingData = await response.json();
            console.log('Received user data:', listingData);

            if (listingData.error){
                return;
            }

            // Update state with the received listing data
            this.setState({ 
                listings: listingData || [],
                filteredListings: listingData || []
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            return false;
        }
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

            return true;

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
                    <input type="radio" name="status" value="Available" checked={this.state.status === 'Available'} onChange={this.handleInputChange}/>Available</label>
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