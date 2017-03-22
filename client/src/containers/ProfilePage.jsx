import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import Profile from "../components/Profile.jsx";
import Favorites from "../components/Favorites.jsx";
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper";

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
            },
            favoriteStyles:[]
          }
        }
    }
    componentWillMount(){
        //get user info
        helpers.getUserInfo(Auth.getToken()).then(function(data){
            console.log("got user info ", data);
            this.setState(client: data);
        });
    }

    render() {
        return (
            <Card className="container">
                <Profile
                    client={this.state.client}
                    />        
                {/*<Favorites 
                    faveStyles={this.state.favoriteStyles}
                    />*/}
            </Card>
        );
    }
}

export default ProfilePage;
