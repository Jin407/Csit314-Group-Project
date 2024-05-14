import { Component } from 'react';
import './realistings.css';

class ListingView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listingid:"",
            address:"",
            price:"",
            sellerUsername:"",
            status:"",
            uploadTime:"",
            viewerUsername:"",
            isMounted: false
        };
    }

    componentDidMount(){
        const listingid = window.location.href.split('/')[5];
        const userType = window.location.href.split('/')[4];
        if(userType === "buyerSold"){
            this.viewListingDetailsBS(listingid);
        } else if (userType === "buyerUnsold") {
            this.viewListingDetailsBU(listingid);
        } else if (userType === "agent"){
            this.viewListingDetailsA(listingid);
        }
    }

    async viewListingDetailsBS(listingid){
        try {
            const response = await fetch('http://127.0.0.1:5000/api/view-property-listing-buyersold', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({listingid})
            });

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listing = await response.json();
            console.log('Received user data:', listing);
            // Update state with listing details
            this.setState({
                address: listing[0][0], // First element of the first tuple
                price: listing[0][1], // Second element of the first tuple
                sellerUsername: listing[0][2], // Third element of the first tuple
                status: listing[0][3], //Fourth element of the first tuple
                uploadTime: listing[0][4]
            });
        } catch (error) {
            console.error('Error showing listing:', error);
            return null;
        }
    }

    async viewListingDetailsBU(listingid){
        try {
            const response = await fetch('http://127.0.0.1:5000/api/view-property-listing-buyerunsold', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({listingid})
            });

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listing = await response.json();
            console.log('Received user data:', listing);
            // Update state with listing details
            this.setState({
                address: listing[0][0], // First element of the first tuple
                price: listing[0][1], // Second element of the first tuple
                sellerUsername: listing[0][2], // Third element of the first tuple
                status: listing[0][3], //Fourth element of the first tuple
                uploadTime: listing[0][4]
            });
        } catch (error) {
            console.error('Error showing listing:', error);
            return null;
        }
    }

    async viewListingDetailsA(listingid){
        try {
            const response = await fetch('http://127.0.0.1:5000/api/view-property-listing-agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({listingid})
            });

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const listing = await response.json();
            console.log('Received user data:', listing);
            // Update state with listing details
            this.setState({
                address: listing[0][0], // First element of the first tuple
                price: listing[0][1], // Second element of the first tuple
                sellerUsername: listing[0][2], // Third element of the first tuple
                status: listing[0][3], //Fourth element of the first tuple
                uploadTime: listing[0][4]
            });
        } catch (error) {
            console.error('Error showing listing:', error);
            return null;
        }
    }

    render(){
        const { address, price, sellerUsername, status, uploadTime } = this.state;
        
        return(
            <>
            <div className="viewListingArea">
                <h2>{address}</h2>
                <p>Price: ${price}</p>
                <p>Seller: {sellerUsername}</p>
                <p>Status: {status}</p>
                <p>Upload Time: {uploadTime}</p>
            </div>
            </>
        )
    }
}

export default ListingView;