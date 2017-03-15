import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const Favorites = ({
    faveStyles
}) => (
  <Card className="container">
      <h2 className="card-heading">My Favorite Styles</h2>
      <ul className="faves">
      {faveStyles.map((style, i) => (
        <img alt={"favorite style " + i} src={style.image} key={i} />
      ))}
      </ul>
  </Card>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array
};

export default Favorites;