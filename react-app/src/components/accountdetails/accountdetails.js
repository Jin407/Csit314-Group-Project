import { Component } from "react"
import './accountdetails.css'

class AccountDetails extends Component{
    render(){
        return(
            <>
            <div className="accountdetails">
                <table className="accountdetailstable"> 
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Username: </td>
                        <td className="accountdetailcolumn2">UserAccount1</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Ratings: </td>
                        <td className="accountdetailcolumn2">4.3/5</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Account Type: </td>
                        <td className="accountdetailcolumn2">Real Estate Agent</td>
                    </tr>
                    <tr className="accountdetailline">
                        <td className="accountdetailcolumn1">Account Created: </td>
                        <td className="accountdetailcolumn2">24 Apr 2024</td>
                    </tr>
                </table>
            </div>
            </>
        )
    }
}

export default AccountDetails;