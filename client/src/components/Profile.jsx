import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Profile extends React.Component {
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
    }
    componentWillMount(){
      console.log(this.props);
    }
    render() {
        return (
            <Card className="container">
              <h2 className="card-heading">User Profile</h2>
              <CardText>User Name: {this.state.user.email}</CardText>
              <CardText>User Email: {this.state.user.name}</CardText>
              <CardText><Link to={'/logout'}>Log Out</Link></CardText>
            </Card>
        );
    }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;