import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const Favorites = ({
    faveStyles
}) => (
  <Card className="container">
      <h2 className="card-heading">My Favorite Styles</h2>
      <ul className="faves">
      {faveStyles ? faveStyles.map((style, i) => (
        <img src={style.image} key={i} />
      )) : "No Saved Styles"}
      </ul>
  </Card>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array
};

export default Favorites;