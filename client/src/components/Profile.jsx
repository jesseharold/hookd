import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';

const Profile = ({
  client
}) => (
  <Card className="container">
      <h2 className="card-heading">User Profile: {client.first_name} {client.last_name}</h2>
        <div className="form-row">
           <label>Email: {client.email}</label>
        </div>
        <h3>My Saved Styles</h3>
  </Card>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};

export default Profile;
