import React, { Component } from "react";
import './recentactions.css';

class RecentActions extends Component {
    render(){
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
                            <td className="recentActionCol1">461 Clementi Rd, SIM Global Education, A.1.17, S599491</td>
                            <td className="recentActionCol2">Purchase</td>
                            <td className="recentActionCol3">14 Mar 2024</td>
                            <td className="recentActionCol4">Leave Review</td>
                        </tr>
                    </table>
                </div>
            </>
        )
    }
}

export default RecentActions;