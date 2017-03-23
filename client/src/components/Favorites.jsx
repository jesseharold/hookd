import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const Favorites = ({
    faveStyles,
    removeSaved,
    makeAppointment
}) => (
  <Card className="container">
    <div className="favorites_col">
      <h2 className="card-heading">My Favorite Styles</h2>
      {faveStyles.map((style, i) => (
        <div key={i} className="col-xs-12 col-lg-6">
          <a className="favimg">
          <img className="fav" alt={"favorite style " + i} src={style.image} style={{width: "100%"}} />
        </a>
        <a> 
          <div className="favesLinks" onClick={function(){removeSaved(i)}}>Remove from Favorites</div>
        </a>
        <a>
          <div className="bookFave" onClick={function(){makeAppointment(i)}}>Book this Style</div>
        </a>
        </div>
      ))}
    </div>
  </Card>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array,
  makeAppointment: PropTypes.func.isRequired,
  removeSaved: PropTypes.func.isRequired
};

export default Favorites;