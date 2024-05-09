import React, {Component} from "react";
import EditProfile from "../components/editprofile/editprofile";
import Headerbanner from "../components/header/header";
import Footer from "../components/footer/footer";

class EditProfilePage extends Component{
    render(){
        return(
            <>
            <div>
                <Headerbanner/>
                <EditProfile/>
                <Footer/>
            </div>
            </>
        )
    }
}

export default EditProfilePage;