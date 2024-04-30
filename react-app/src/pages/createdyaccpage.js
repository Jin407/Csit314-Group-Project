import CreateDynamicAccount from "../components/createaccount/createaccount";
import React, {Component} from "react";

class CreateAccountPage extends Component{
    render(){
        return(
            <>
            <div>
                <CreateDynamicAccount />
            </div>
            </>
        )
    }
}

export default CreateAccountPage;