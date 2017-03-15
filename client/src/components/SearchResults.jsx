import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const SearchResults = ({
  foundImages,
  addFavoriteImage
}) => (
  <Card className="container">
      <h2 className="card-heading">Search Results</h2>
      <ul className="search-results">
      {foundImages ? foundImages.map((result, i) => (
        <li key={i} onClick={function(){addFavoriteImage(result);}}><img className="result" src={result.url} /></li>
      )) : "No Results Yet"}
      </ul>
  </Card>
);

SearchResults.propTypes = {
  foundImages: PropTypes.array,
  addFavoriteImage: PropTypes.func.isRequired
};

export default SearchResults;