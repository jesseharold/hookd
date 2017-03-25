import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper";
import Favorites from "../components/Favorites.jsx";

const Profile = ({
  client,
  removeSaved
}) => (
  <div>
      <h2 className="card-heading">User Profile</h2>
        <section>
            First Name: {client.first_name}&nbsp;&nbsp;&nbsp;&nbsp;<span className="favesLinks">edit</span><br />
            Last Name: {client.last_name}&nbsp;&nbsp;&nbsp;&nbsp;<span className="favesLinks">edit</span><br />
            Email: {client.email}&nbsp;&nbsp;&nbsp;&nbsp;<span className="favesLinks">edit</span><br />
            Password: <span className="favesLinks">Reset</span><br />
            User Type: {client.role}<br />
            <br />
            <Link to="/logout" className="findstyle">
            <button className="findnewstyle">Log Out</button>
            </Link><br />
        </section>
        <h3 className="card-heading">Appointments</h3>
        <section>
          {client.appointments ? client.appointments.map((appointment, i) => (
              <div key={i}>
                  Date: {appointment.startTime ? appointment.startTime : "Unknown"}<br />
                  Style requested: {appointment.requestedStyle ? appointment.requestedStyle : "No style set."}<br />
                  Barber: {appointment.barber ? appointment.barber : "No barber selected yet."}<br />
                  Paid for: {appointment.paid ? appointment.paid : "Not paid."}<br />
              </div>
          )) : <span>You have no appointments scheduled</span>}
          <br />
          <Link to="/appointments" className="findstyle">
          <button className="findnewstyle">Book a new appointment</button>
          </Link>
      </section>
      <Favorites 
        faveStyles={client.likedStyles} 
        removeSaved={removeSaved}
        thumbSize="smallThumb" />
    <Link className="findstyle" to="/findstyle">
    <button className="findnewstyle">Find a new style.</button>
    </Link>
    <br />
    <br />
  </div>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired,
  removeSaved: PropTypes.func.isRequired
};

export default Profile;