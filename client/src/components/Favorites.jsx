import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Favorites = ({
    faveStyles,
    removeSaved,
    thumbSize
}) => (
    <div className="favorites_col">
      <h2 className="card-heading">My Favorite Styles</h2>
      {faveStyles.map((style, i) => (
        <div key={i} className={thumbSize ? thumbSize : "col-xs-12 col-lg-6"}>
          <a className="favimg">
          <img className="fav" alt={"favorite style " + i} src={style.image} />
        </a>
        <a> 
          <div className="favesLinks" onClick={function(){removeSaved(i)}}>Remove from Favorites</div>
        </a>
          <Link className="bookFave" to="/appointments">Book this Style</Link>
        </div>
      ))}
    </div>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array,
  removeSaved: PropTypes.func.isRequired,
  thumbSize: PropTypes.string
};

export default Favorites;