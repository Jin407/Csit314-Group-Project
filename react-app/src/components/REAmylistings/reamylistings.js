import { Component } from "react";
import { Link } from "react-router-dom";
import Listing from "./realisting";
//import ListingTestbox from "./@@testlistingtbox";
import './realistings.css';

class REAMyListings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
        };
    }

    state = {
        listings: [], // Initially an empty array, will be populated with data
        filteredListings: [], // For filtered listings based on search
        searchInput: '' // State to hold search input
    };

    componentDidMount() {
        this.setState({
            username: window.location.href.split('/')[4]
        });
    
        fetch('http://127.0.0.1:5000/api/login')
          .then(response => response.json())
          .then(data => {
              this.setState({ 
                  listings: data || [], // Ensure data is an array or default to empty array
                  filteredListings: data || [] // Ensure data is an array or default to empty array
              });
          })
          .catch(error => console.error('Error fetching listings:', error));
    }

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
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ listingid })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonresponse = await response.json(); // Assuming the server returns a boolean value
            return jsonresponse.success;
        } catch (error) {
            console.error('Error creating listing:', error);
            return false;
        }
    };

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
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
                {/* TESTING BOXES
                <ListingTestbox/><ListingTestbox/><ListingTestbox/><ListingTestbox/>
                */}
                    {filteredListings && filteredListings.map(listing => (
                        <Listing key={listing.id} 
                          listing={listing} 
                          onDelete={() => this.handleDeleteListing(listing.id)}
                          onView={() => this.handleViewListing(listing.id)}
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