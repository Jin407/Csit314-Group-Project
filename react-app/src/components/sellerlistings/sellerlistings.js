import React, { Component } from "react";
import './sellerlistings.css';

class SellerListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            listings:[],
        };
    }

    componentDidMount() {
        this.setState({
            username: window.location.href.split('/')[4]
        });
    
        this.getListings();
    }

    getListings = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/favourite-listings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonresponse = await response.json();
            // Assuming the server returns an array of listings
            return jsonresponse.listings || []; // Return the listings array or an empty array if not present
        } catch (error) {
            console.error('Error fetching listings:', error);
            return []; // Return an empty array if there's an error
        }
    };

    render(){
        const { listings } = this.state;
        return(
            <>
            <div className="sellerlisting-area">
                <h1 className="sellerlisting-header">My Listings</h1>
                <div className="sellerlisting-container">
                    <table className="sellerListingTable">
                        <thead className="sellerListingTablethead">
                            <th className="sellerListingTableCol1">Address</th>
                            <th className="sellerListingTableCol2">Agent Username</th>
                            <th className="sellerListingTableCol3">Status</th>
                            <th className="sellerListingTableCol4">Views</th>
                            <th className="sellerListingTableCol5">Favourites</th>
                        </thead>
                        {listings && listings.map(listing => (
                            <tbody key={listing.id}>
                                <td colSpan={5}>
                                    <hr/>
                                </td>
                                <tr>
                                    <td className="sellerListingTableCol1">{listing.address}</td>
                                    <td className="sellerListingTableCol2">{listing.agentUsername}</td>
                                    <td className="sellerListingTableCol3">{listing.status}</td>
                                    <td className="sellerListingTableCol4">{listing.viewCount}</td>
                                    <td className="sellerListingTableCol5">{listing.favCount}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
            </>
        )
    }
    
}

export default SellerListings;