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
          <span>Welcome, <Link to="/profile">{Auth.getUserName()}</Link></span>
          <Link to="/findstyle">Find My Style</Link>
          <Link to="/appointments">Appointments</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          
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
