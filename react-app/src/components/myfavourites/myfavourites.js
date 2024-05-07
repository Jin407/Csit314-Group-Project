import { Component } from "react";
import MFListing from "./myfavouriteslisting";
import './myfavourites.css';
//import TestMFListing from "./@@testmflisting";

class MyFavourites extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
        };
    }
    
    state = {
        favouriteListings: [], // Initially an empty array, will be populated with data
    };

    componentDidMount() { //use this to get array of Favourited Listing's IDs
        this.setState({username: window.location.href.split('/')[4]});
        fetch('http://127.0.0.1:5000/api/favourite-listing')
          .then(response => response.json())
          .then(listing => {
            this.setState({ 
              favouriteListings: listing || [], // Ensure data is an array or default to empty array
            });
          }).catch(error => console.error('Error fetching listings:', error));
    }

    handleViewListing = (listingid) => {
        window.location.href = `/viewlistingpage/${listingid}`
    };

    render(){
        const { favouriteListings } = this.state;
        return(
            <>
            <div className="myfavouritesarea">
                <h2>My Favourites</h2>
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