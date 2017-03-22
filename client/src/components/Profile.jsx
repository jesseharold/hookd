import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper";

const Profile = ({
  client
}) => (
  <div>
      <h2 className="card-heading">User Profile</h2>
        First Name: {client.first_name}<br />
        Last Name: {client.last_name}<br />
        Email: {client.email}<br />
        <Link to="/logout">Log Out</Link><br />
  </div>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};

export default Profile;