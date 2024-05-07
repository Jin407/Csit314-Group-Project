import { Component } from "react";


class ViewRandR extends Component{
    state = {
        ratings: [], // Initially an empty array, will be populated with data
        reviews: [], // Initially an empty array, will be populated with data
    };

    componentDidMount() {
        this.setState({
            username: window.location.href.split('/')[4]
        });
        fetch('http://127.0.0.1:5000/api/login')
          .then(response => response.json())
          .then(data => this.setState({ listings: data, filteredListings: data }))
          .catch(error => console.error('Error fetching listings:', error));
    }

    render(){
        return(
            <>
            <h2>My Ratings and Reviews</h2>
            </>
        )
    }
}