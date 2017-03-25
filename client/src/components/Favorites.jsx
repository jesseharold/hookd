import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Favorites = ({
    faveStyles,
    clickHandler,
    removeSaved,
    thumbSize,
    titleText,
    selected
}) => (
    <div className="favorites_col">
      <h2 className="card-heading">{titleText ? titleText : "My Favorite Styles"}</h2>
      {faveStyles.map((style, i) => (
        <div key={i} className={thumbSize ? thumbSize : "col-xs-12 col-lg-6"} onClick={clickHandler ? function(){clickHandler(i)} : function(){}}>
          <a className={(i == selected) ? "favimg selectedFave" : "favimg"}>
          <img className="fav" alt={"favorite style " + i} src={style.image} />
        </a>
        {removeSaved ? 
        <div className="faveOptions">
          <a><div className="favesLinks" onClick={function(){removeSaved(i)}}>Remove from Favorites</div></a>
            <Link className="bookFave" to="/appointments">Book this Style</Link>
        </div>
        : ""}
        </div>
      ))}
    </div>
);

Favorites.propTypes = {
  faveStyles: PropTypes.array.isRequired,
  clickHandler: PropTypes.func,
  removeSaved: PropTypes.func,
  thumbSize: PropTypes.string,
  titleText: PropTypes.string,
  selected: PropTypes.number
};

export default Favorites;