import { Component } from "react";
import RatingsAndReviews from "./ratingandreviewdisplay";
import './REAviewRandR.css';
import Testrr from "./@@testrr";

class ViewRandR extends Component{
    state = {
        ratings: [], // Initially an empty array, will be populated with data
        final_rating: 0
    };

    componentDidMount() {
        const username = window.location.href.split('/')[4];

        this.setState({}, () => {
            this.viewReviews(username);
            this.viewRating(username)
        });
    }

    viewReviews = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/view-reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reviewData = await response.json();
            console.log('Received user data:', reviewData);

            if (reviewData.error){
                console.log(reviewData.error)
                return;
            }

            this.setState({ ratings: reviewData, reviews: reviewData })
            

        } catch (error) {
            console.error('Error viewing reviews:', error);
            
        }
    };

    viewRating = async (username) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/view-rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const ratingData = await response.json();
            console.log('Received data:', ratingData);

            if (ratingData.error){
                console.log(ratingData.error)
                return;
            }

            this.setState({ final_rating: ratingData })
            

        } catch (error) {
            console.error('Error viewing rating:', error);
            
        }
    };

    render(){
        const {ratings, final_rating} = this.state;
        return(
            <>
            <div className = "RandRDisplay">
            <h2>My Ratings and Reviews</h2>
            <p>Rating: {final_rating}/5</p>
            {/*<Testrr/><Testrr/><Testrr/>*/}
            {ratings && ratings.map(rating => (
              <RatingsAndReviews key={rating.id} rating={rating}/>
            ))}
            </div>
            </>
        )
    }
}

export default ViewRandR;