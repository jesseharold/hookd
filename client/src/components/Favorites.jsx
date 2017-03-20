import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const Favorites = ({
    faveStyles
}) => (
  <Card className="container">
      <h2 className="card-heading">My Favorite Styles</h2>
      {faveStyles.map((style, i) => (
        <div key={i} className="col-xs-8 col-md-4">
          <img alt={"favorite style " + i} src={style.image} style={{width: "100%"}}  />
        </div>
      ))}
  </Card>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array
};

export default Favorites;