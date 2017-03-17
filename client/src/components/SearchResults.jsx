import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';

const SearchResults = ({
  foundImages,
  addFavoriteImage
}) => (
  <Card className="container">
      <h2 className="card-heading">Search Results</h2>
      
      <div className="row">
      {foundImages ? foundImages.map(result => (
        
          <div key={result.url} className="col-xs-8 col-md-4">
            <a onClick={function(){addFavoriteImage(result);}} className="thumbnail">
        <img src={result.url} height={result.height} width={result.width} />
            </a>
          </div>
      )) : "No Results Yet"}
      </div>
  </Card>
);

SearchResults.propTypes = {
  foundImages: PropTypes.array,
  addFavoriteImage: PropTypes.func.isRequired
};

export default SearchResults;