import { Component } from "react";
import RatingsAndReviews from "./ratingandreviewdisplay";
import './REAviewRandR.css';
import Testrr from "./@@testrr";

class ViewRandR extends Component{
    state = {
        ratings: [], // Initially an empty array, will be populated with data
    };

    componentDidMount() {
        this.setState({
            username: window.location.href.split('/')[4]
        });
        fetch('http://127.0.0.1:5000/api/login')//http://127.0.0.1:5000/api/ratingsAndReviews?username=${username}
          .then(response => response.json())
          .then(data => this.setState({ ratings: data, reviews: data }))
          .catch(error => console.error('Error fetching listings:', error));
    }

    render(){
        const {ratings} = this.state;
        return(
            <>
            <div className = "RandRDisplay">
            <h2>My Ratings and Reviews</h2>
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