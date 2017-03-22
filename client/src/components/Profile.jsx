import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper"

const Profile = ({
  client
}) => (
  <div>
      <h2 className="card-heading">User Profile</h2>
        First Name: {client.first_name}<br />
        Last Name: {client.last_name}<br />
        Email: {client.email}<br />
        User Type: {client.role}<br />
        <br />
        <Link to="/logout"><button>Log Out</button></Link><br />
        <h3>Appointments</h3>
        <div className="appointments">
          {client.appointments > 0 ? client.appointments.map((appointment, i) => (
              <div key={i} className="col-xs-8 col-md-4">
                  Date: {appointment.startTime}<br />
                  Style requested: {appointment.requestedStyle}<br />
                  Barber: {appointment.barber}<br />
                  Paid for: {appointment.paid}<br />
              </div>
          )) : <span>You have no appointments scheduled</span>}
          <br />
          <br />
          <Link to="/appointments"><button>Book a new appointment</button></Link>
      </div>
      <h3>Saved Styles</h3>
      <div className="appointments">
        {client.likedStyles > 0 ? client.likedStyles.map((style, i) => (
            <div key={i} className="col-xs8 col-md-3">
                <img src="{style.image}" />
            </div>
        )) : <span>You have no Saved Styles.</span>}
        <br />
        <br />
        <Link to="/findstyle"><button>Find a new style.</button></Link>
    </div>
  </div>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};

export default Profile;