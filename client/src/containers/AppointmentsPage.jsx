import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import BookingForm from '../components/BookingForm.jsx';
import Auth from '../modules/Auth';

class AppointmentsPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            user: {
                first_name: Auth.getFirstName(),
                last_name: Auth.getLastName()
            },
            appointment: {
                barber: "1",
                month: "1",
                day: "1",
                year: "2017",
                hour: "1",
                ampm: "PM"
            }
        };
        this.doBooking = this.doBooking.bind(this);
        this.updateBookingForm = this.updateBookingForm.bind(this);
    }
    
    doBooking(event){
        event.preventDefault();
        // send the appointment object to the server
        console.log("do booking ", this.state.appointment);
    }

    updateBookingForm(event){
        //console.log("update form ", event.target.value);
        var newAppt = this.state.appointment;
        newAppt[event.target.name] = event.target.value;
        this.setState({user: newAppt});
        console.log(newAppt);
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