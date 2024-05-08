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
            filterStatus: "All" // Initial filter status, can be "All", "Sold", or "Unsold"
        };
    };
    
    
    state = {
        favouriteListings: [], // Initially an empty array, will be populated with data
    };

    componentDidMount() { //use this to get array of Favourited Listing's IDs
        this.setState({username: window.location.href.split('/')[4]});
        this.fetchFavouriteListings(); // Fetch favourite listings when component mounts
    }

    fetchFavouriteListings = () => {
        fetch('http://127.0.0.1:5000/api/favourite-listing')
            .then(response => response.json())
            .then(listings => {
                this.setState({ 
                    favouriteListings: listings || [] // Ensure data is an array or default to empty array
                });
            })
            .catch(error => console.error('Error fetching listings:', error));
    }

    // Function to handle radio button change
    handleRadioChange = (event) => {
        this.setState({ filterStatus: event.target.value }, () => {
            this.filterListings(); // Filter listings based on the selected status
        });
    };

    // Function to filter listings based on the selected status
    filterListings = () => {
        const { favouriteListings, filterStatus } = this.state;
        let filteredListings = favouriteListings;

        if (filterStatus !== "All") {
            filteredListings = favouriteListings.filter(listing => listing.status === filterStatus);
        }

        this.setState({ filteredListings });
    };

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
    };

    render(){
        const { favouriteListings , filterStatus } = this.state;
        return(
            <>
            <div className="myfavouritesarea">
                <h2>My Favourites</h2>
                <div className="bs-filter-container">
                    <label className="bs-filter-item">
                        <input 
                            type="radio" 
                            value="All" 
                            checked={filterStatus === "All"} 
                            onChange={this.handleRadioChange} 
                        />
                        All
                    </label>
                    <label className="bs-filter-item">
                        <input 
                            type="radio" 
                            value="Unsold" 
                            checked={filterStatus === "Unsold"} 
                            onChange={this.handleRadioChange} 
                        />
                        Unsold
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
                {favouriteListings && favouriteListings.map(listing => (
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