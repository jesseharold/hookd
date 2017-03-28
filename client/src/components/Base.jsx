import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
    <nav className="top-bar">
      <div className="top-bar-left">
        <IndexLink className="topleft" to="/">Hook'd</IndexLink>
      </div>

    {Auth.isUserAuthenticated() ? (
      <ul className="nav navbar-nav navbar-right top-bar-right">
          <li>
            <Link className="navItem" to="/profile">{Auth.getFirstName()}'s Profile</Link>
          </li><li>
            <Link className="navItem" to="/findstyle">Find My Style</Link>
          </li><li>
            <Link className="navItem" to="/appointments">Book an Appointment</Link>
          </li>
      </ul>
    ) : (
      <ul className="nav navbar-nav navbar-right top-bar-right">
        <li>
          <Link to="/login">Log in</Link>
        </li><li>
          <Link to="/signup">Register</Link>
        </li>
      </ul>
    )}
    </nav>
    <div style={{clear:"both"}} />
    { /* child component will be rendered here */ }
    <div className className="container wrapAll">
      {children}
    </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
