import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';

class AppointmentsPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            user: {
                email: "",
                name: "",
                password: ""
            }
        };
    }
    render() {
        return (
            <Card className="container">
                <h2 className="card-heading">Book a New Appointment</h2>
                <CardText>Appointments stuff goes here</CardText>
                  <Link to="/pay">Pay for this appointment</Link>
                <h2 className="card-heading">Upcoming Appointments</h2>
                <CardText>Appointments stuff goes here</CardText>
                  <Link to="/pay">Pay for this appointment</Link>
                <h2 className="card-heading">Past Appointments</h2>
                <CardText>Appointments stuff goes here</CardText>
                  <Link to="/pay">Pay for this appointment</Link>
            </Card>
        );
    }
}


AppointmentsPage.contextTypes = {
//  router: PropTypes.object.isRequired
};

export default AppointmentsPage;