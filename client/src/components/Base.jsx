import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
      
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink className="topleft" to="/">Hook'd</IndexLink>
      </div>

    {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link className="navItem" to="/profile">{Auth.getFirstName()}'s Profile</Link>
          <Link className="navItem" to="/findstyle">Find My Style</Link>
          <Link className="navItem" to="/appointments">Book an Appointment</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Register</Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
