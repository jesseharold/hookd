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
        <section>
            First Name: {client.first_name}<br />
            Last Name: {client.last_name}<br />
            Email: {client.email}<br />
            User Type: {client.role}<br />
            <br />
            <Link to="/logout"><button>Log Out</button></Link><br />
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
          <Link to="/appointments"><button>Book a new appointment</button></Link>
      </section>
      <h3 className="card-heading">Saved Styles</h3>
      <section>
        {client.likedStyles ? client.likedStyles.map((style, i) => (
            <div key={i} className="styleThumbs">
                <img src={style.image} />
            </div>
        )) : <span>You have no Saved Styles.</span>}
        <br />
        <br />
        <Link to="/findstyle"><button>Find a new style.</button></Link>
    </section>
  </div>
);

Profile.propTypes = {
  client: PropTypes.object.isRequired
};

export default Profile;