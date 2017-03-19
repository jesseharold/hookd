import React, { PropTypes } from "react";
import Profile from "../components/Profile.jsx";

class ProfilePage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            user: {
                email: "dummyeml",
                name: "dummyname",
                password: "dummypass"
            }
        };
        console.log(this.state.user);
    }
    render() {
        return (
            <Profile 
                user={this.state.user}
                />
        );
    }
}


Profile.contextTypes = {
//  router: PropTypes.object.isRequired
};

export default Profile;