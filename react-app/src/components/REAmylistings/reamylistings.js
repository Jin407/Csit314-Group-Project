import { Component } from "react";
import { Link } from "react-router-dom";
import Listing from "./realisting";
//import Listings from "./testlistingtbox.js";
import './realistings.css';

class REAMyListings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            userType:"agent"
        };
    }

    state = {
        listings: [], // Initially an empty array, will be populated with data
        filteredListings: [], // For filtered listings based on search
        searchInput: '' // State to hold search input
    };

    componentDidMount() {
        const username = window.location.href.split('/')[4];

        this.setState({ username }, () => {
            this.displayListings(username);
        });
    }

    displayListings = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/display-property-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username})
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

    handleSearchChange = event => {
        const { value } = event.target;
        const { listings } = this.state;
    
        // Filter listings based on search input
        const filteredListings = listings.filter(listing =>
          listing.address.toLowerCase().includes(value.toLowerCase())
        );
    
        this.setState({ searchInput: value, filteredListings });
    };

    handleDeleteListing = async (listingid) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/delete-property-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ listingid })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
        } catch (error) {
            console.error('Error creating listing:', error);
            
        }
    };

    handleViewListing = (listingid,userType) => {
        window.location.href = `/viewlistingpage/${userType}/${listingid}`
    };

    handleUpdateListing = (listingid) => {
        window.location.href = `/updatelistingpage/${listingid}`
    };

    render(){
        const { username, filteredListings, searchInput } = this.state;
        return(
            <>
            <div className="mylistingarea">
                <h2>My Listings</h2>
                <input type="text" value={searchInput} onChange={this.handleSearchChange} placeholder="Search by address..."/>
                <Link to={`/reacreatelistingpage/${username}`}><button>Create Listing</button></Link>
                <div className="listings-container">
                {/*<Listings/><Listings/><Listings/><Listings/>*/}
                
                    {filteredListings && filteredListings.map(listing => (
                        <Listing key={listing.id} 
                          listing={listing} 
                          onDelete={() => this.handleDeleteListing(listing.id)}
                          onView={() => this.handleViewListing(listing.id, this.state.userType)}
                          onUpdate={() => this.handleUpdateListing(listing.id)}
                        />
                    ))}
                </div>
            </div>
            </>
        )
    }
}

export default REAMyListings;