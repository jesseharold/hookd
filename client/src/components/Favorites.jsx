import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const Favorites = ({
    faveStyles,
    removeSaved,
    makeAppointment
}) => (
  <Card className="container sidebar-left">
      <h2 className="card-heading">My Favorite Styles</h2>
      {faveStyles.map((style, i) => (
        <div key={i} className="col-xs-12 col-lg-6">
          <img alt={"favorite style " + i} src={style.image} style={{width: "100%"}}  />
          <div className="favesLinks removeFave" onClick={function(){removeSaved(i)}}>Remove from Favorites</div>
          <div className="favesLinks bookFave" onClick={function(){makeAppointment(i)}}>Book this Style</div>
        </div>
      ))}
  </Card>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array,
  makeAppointment: PropTypes.func.isRequired,
  removeSaved: PropTypes.func.isRequired
};

export default Favorites;