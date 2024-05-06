import React, { Component } from "react";
import './recentactions.css';

class RecentActions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            address: null,
            userType: '',
            createdAt: ''
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
                createdAt: userData[0][2] // Third element of the first tuple
            });
        } catch (error) {
            console.error('Error updating account:', error);
            return null;
        }
    }

    render(){

        const { address, userType, createdAt } = this.state;
        let recentAction;
        if (userType === 'buyerUser') {
            recentAction = 'Purchase';
        } else if(userType == 'sellerUser'){
            recentAction = 'Sold';
        }else if(userType == 'agentUser'){
            recentAction = 'Managed';
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
                            <td className="recentActionCol4">Leave Review</td>
                        </tr>
                    </table>
                </div>
            </>
        )
    }
}

export default RecentActions;