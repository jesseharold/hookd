import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper"

function getSavedStyles(){
    const savedStyles = helpers.getSavedStyles(Auth.getToken()).then(function(styles){
        if (!styles || !styles.data || styles.status !== 200){
            console.error("something went wrong: ", styles);
        } else {
             console.log("got user's styles: ", styles.data.likedStyles); 
            // self.setState({
            //     favoriteStyles: styles.data.likedStyles
            // });
        }
    });
}

const Profile = ({
  client
}) => (
  <div>
      <h2 className="card-heading">User Profile</h2>
        First Name: {client.first_name}<br />
        Last Name: {client.last_name}<br />
        Email: {client.email} {client.last_name}<br />
        <Link to="/logout">Log Out</Link><br />
  </div>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};

export default Profile;
