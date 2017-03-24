import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import BookingForm from '../components/BookingForm.jsx';

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
            },
            appointment: {
                
            }
        };
    }
    
    doBooking(event){
        event.preventDefault();
        console.log("do booking ", event.target);
    }

    updateBookingForm(event){
        //console.log("update form ", event.target.value);
        var newUser = this.state.user;
        newUser[event.target.name] = event.target.value;
        this.setState({user: newUser});
    }

    render() {
        return (
            <Card className="container">
                <BookingForm onSubmit={this.doBooking} onChange={this.updateBookingForm} client={this.state.user} />
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