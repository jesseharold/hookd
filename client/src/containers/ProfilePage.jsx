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
            likedStyles: [],
            appointments: [],
            card:{
              number: "",
              exp_month: "",
              exp_year: "",
              cvc: ""
            }
          }
        }
    this.removeSaved = this.removeSaved.bind(this);
    }
    componentWillMount(){
        //get user info
        const self = this;
        helpers.getUserInfo(Auth.getToken()).then(function(user){
            self.setState({client: user.data});
        });
    }

    removeSaved(index){
        var self = this;
        const idToDestroy = self.state.client.likedStyles[index]._id;
        helpers.destroyFavorite(Auth.getToken(), idToDestroy).then(function(res){
            //console.log("done destroying. updated user: ", res.data);
            const updatedClient = self.state.client;
            updatedClient.likedStyles = res.data.likedStyles;
            self.setState({
                client: updatedClient
            });
        });
    }

    render() {
        return (
            <Card>
                <Profile
                    client={this.state.client}
                    removeSaved={this.removeSaved}
                    />        
            </Card>
        );
    }
};

export default ProfilePage;
