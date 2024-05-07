import React, { Component } from "react";
import './recentactions.css';
import { Link } from "react-router-dom";

class RecentActions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            address: null,
            userType: '',
            createdAt: '',
            agentname:''
        };
    }

    componentDidMount() {
        const username = window.location.href.split('/')[4];
        
        this.setState({ username }, () => {
            this.viewUserActions(username);
        });
    }

    viewUserActions = async (username) => {
        try {

            const response = await fetch('http://127.0.0.1:5000/api/view-user-actions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({username})
            });

            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            console.log('Received user data:', userData);
            // Update state with user details
            this.setState({
                address: userData[0][0], // First element of the first tuple
                userType: userData[0][1], // Second element of the first tuple
                createdAt: userData[0][2], // Third element of the first tuple
                agentname: userData[0][3] //Fourth element of the first tuple
            });
        } catch (error) {
            console.error('Error updating account:', error);
            return null;
        }
    }

    render(){

        const { username, address, userType, createdAt, agentname } = this.state;
        let recentAction;
        let leaveReviewLink;
        if (userType === 'buyerUser') {
            recentAction = 'Purchased';
        } else if(userType == 'sellerUser'){
            recentAction = 'Selling';
        }else if(userType == 'agentUser'){
            recentAction = 'Managing';
        }

        if (userType === 'agentUser') {
            // If userType is 'agentUser', set leaveReviewLink to null (no content)
            leaveReviewLink = null;
        } else {
            // For other user types, set leaveReviewLink to the JSX for the link
            leaveReviewLink = (
                <Link to={`/rateandreview/${username}/${agentname}`} className="leavereviewlink">
                    Leave Review
                </Link>
            );
        }
        return(
            <>
                <div className="recentActionsBox">
                    <table className="recentActionsTable">
                        <tr>
                            <th className="recentActionCol1">Location</th>
                            <th className="recentActionCol2">Action</th>
                            <th className="recentActionCol3">Date</th>
                            <th className="recentActionCol4">Follow-up action</th>
                        </tr>
                        <tr>
                            <td className="recentActionCol1">{address}</td>
                            <td className="recentActionCol2">{recentAction}</td>
                            <td className="recentActionCol3">{createdAt}</td>
                            <td className="recentActionCol4">
                            {leaveReviewLink}</td>
                        </tr>
                    </table>
                </div>
            </>
        )
    }
}

export default RecentActions;