import { Component } from "react"
import './accountdetails.css'

class AccountDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userType: '',
            createdAt: ''
        };
    }

    componentDidMount() {
        const username = window.location.href.split('/')[4];
        
        this.setState({ username }, () => {
            this.viewUserDetails(username);
        });
    }
    

    viewUserDetails = async (username) => {
        try {

            const response = await fetch('http://127.0.0.1:5000/api/view-user-details', {
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
                userType: userData[0][0],
                createdAt: userData[0][1]
            });
        } catch (error) {
            console.error('Error updating account:', error);
            return null;
        }
    }


    render(){

        const { username, userType, createdAt } = this.state;

        return(
            <>
            <div className="accountdetails">
                <table className="accountdetailstable"> 
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Username: </td>
                        <td className="accountdetailcolumn2">{username}</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Account Type: </td>
                        <td className="accountdetailcolumn2">{userType}</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Account Created: </td>
                        <td className="accountdetailcolumn2">{createdAt}</td>
                    </tr>
                </table>
            </div>
            </>
        )
    }
}

export default AccountDetails;