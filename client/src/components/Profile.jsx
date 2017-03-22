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
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="first_name"
          errorText={errors.first_name}
          onChange={onChange}
          value={user.first_name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  <div>
      <h2 className="card-heading">User Profile</h2>
        First Name: {client.first_name}<br />
        Last Name: {client.last_name}<br />
        Email: {client.email} {client.last_name}<br />
        <Link to="/logout">Log Out</Link><br />
  </div>
  </Card>


);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};


export default Profile;
