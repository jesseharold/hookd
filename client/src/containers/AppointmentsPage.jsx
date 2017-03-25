import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import BookingForm from '../components/BookingForm.jsx';
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper"

class AppointmentsPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            user: {
                first_name: Auth.getFirstName(),
                last_name: Auth.getLastName(),
                likedStyles: []
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
    componentWillMount(){
        // get user styles from db 
        var self = this;
        const savedStyles = helpers.getSavedStyles(Auth.getToken()).then(function(styles){
            if (!styles || !styles.data || styles.status !== 200){
                console.error("something went wrong: ", styles);
            } else {
                const updatedUser = self.state.user;
                updatedUser.likedStyles = styles.data.likedStyles;
                self.setState({
                    user: updatedUser
                });
            }
        });
    }

    doBooking(event){
        event.preventDefault();
        // send the appointment object to the server
        helpers.createAppointment(Auth.getToken(), this.state.appointment).then(function(appt){
            console.log("appointment created");
        });
    }

    updateBookingForm(event){
        var newAppt = this.state.appointment;
        newAppt[event.target.name] = event.target.value;
        this.setState({appointment: newAppt});
    }

    render() {
        return (
            <Card className="container">
                <BookingForm onSubmit={this.doBooking} onChange={this.updateBookingForm} client={this.state.user} />
            </Card>
        );
    }
}


AppointmentsPage.contextTypes = {
//  router: PropTypes.object.isRequired
};

export default AppointmentsPage;