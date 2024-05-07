import React, { Component } from "react";
import './rateandreview.css';

class RateAndReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating:"",
            review:"",
            username1:"",
            username2:"",
        };
    }

    componentDidMount() {
        this.setState({
            username1: window.location.href.split('/')[4],
            username2: window.location.href.split('/')[5]
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { username1, username2, review, rating } = this.state;
        const success1 = await this.submitReview( username1, username2, review);
        const success2 = await this.submitRating( username1, username2, rating);
    };

    submitRating = async (username1, username2, rating) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username1, username2, rating })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonresponse = await response.json(); // Assuming the server returns a boolean value
            return jsonresponse.success1;
        } catch (error) {
            console.error('Error submitting rating:', error);
            return false;
        }
    };

    submitReview = async (username1, username2, review) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username1, username2, review })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonresponse = await response.json(); // Assuming the server returns a boolean value
            return jsonresponse.success2;
        } catch (error) {
            console.error('Error submitting review:', error);
            return false;
        }
    };

    render(){
        const { username1 , username2 } = this.state;
        return(
            <>
                <div className="randr">
                    <h2>Hello {username1}, please rate and review your Agent: {username2}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>Rating: </label>
                        <input type="text" name="rating" value={this.state.rating} placeholder="Rating" className="loginTextBox" onChange={this.handleInputChange}/>
                        <label>Review: </label>
                        <input type="text" name="review" value={this.state.review} placeholder="Review" className="loginTextBox" onChange={this.handleInputChange}/>
                        <input type="submit" value="Submit Rating and Review"/>
                    </form>
                </div>
            </>
        )
    }


}

export default RateAndReview;