import { Component } from "react";
import MFListing from "./myfavouriteslisting";
import './myfavourites.css';
//import TestMFListing from "./@@testmflisting";

class MyFavourites extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            favouriteListings: [], // Initially an empty array, will be populated with data
            filteredListings: [],
            filterStatus: "All" // Initial filter status, can be "All", "Sold", or "Unsold"
        };
    };
    
    
    state = {
        favouriteListings: [], // Initially an empty array, will be populated with data
    };

    componentDidMount() { //use this to get array of Favourited Listing's IDs
        const username = window.location.href.split('/')[4];
         
        this.displayUnsoldFavouriteListings(username);
    }

    displaySoldFavouriteListings = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/display-favourite-listings', {
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
                favouriteListings: listingData || [],
                filteredListings: listingData || []
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            return false;
        }
    };

    displayUnsoldFavouriteListings = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/display-favourite-listings', {
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
                favouriteListings: listingData || [],
                filteredListings: listingData || []
            });
        } catch (error) {
            console.error('Error creating listing:', error);
            return false;
        }
    };

    handleRadioChange = (event) => {
        const filterStatus = event.target.value;
        /*this.setState({ filterStatus }, () => {
            this.filterListings(); // Filter listings based on the selected status
        });*/
        if (filterStatus === "Available"){
            this.displayUnsoldFavouriteListings();
        } else {
            this.displaySoldFavouriteListings();
        }
    };
    
    filterListings = () => {
        const { favouriteListings, filterStatus } = this.state;
        let filteredListings = favouriteListings;
    
        // Filter listings based on status
        if (filterStatus !== "All") {
            filteredListings = filteredListings.filter(listing => listing.status === filterStatus);
        }
    
        // Update state with filtered listings
        this.setState({ filteredListings });
    };

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
    };

    render(){
        const { filteredListings , filterStatus } = this.state;
        return(
            <>
            <div className="myfavouritesarea">
                <h2>My Favourites</h2>
                <div className="bs-filter-container">
                    <label className="bs-filter-item">
                        <input 
                            type="radio" 
                            value="Available" 
                            checked={filterStatus === "Available"} 
                            onChange={this.handleRadioChange} 
                        />
                        Available
                    </label>
                    <label className="bs-filter-item">
                        <input 
                            type="radio" 
                            value="Sold" 
                            checked={filterStatus === "Sold"} 
                            onChange={this.handleRadioChange} 
                        />
                        Sold
                    </label>
                </div>
                <div className="listings-container">
                {filteredListings && filteredListings.map(listing => (
                    <MFListing key={listing.id} 
                      listing={listing} 
                      onView={() => this.handleViewListing(listing.id)}
                    />
                ))}
                </div>
            </div>
            </>
        )
    }  
}

export default MyFavourites;