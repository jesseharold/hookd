import React, { PropTypes } from "react";
import Profile from "../components/Profile.jsx";

class ProfilePage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
          client: {
            first_name: "",
            last_name: "",
            email: "",
            card:{
              number: "",
              exp_month: "",
              exp_year: "",
              cvc: ""
            }
          }
        }
    }
    componentWillMount(){
        //get user info
        console.log("getting user info");
    }

    render() {
        return (
            <Profile
                client={this.state.client}
                />
        );
    }
}

export default ProfilePage;
