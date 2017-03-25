import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const SearchResults = ({
  foundImages,
  addFavoriteImage,
  getMore
}) => (
  <Card className="container">
      <h2 className="card-heading">Search Results</h2>
      
      <div className="row">
      {foundImages.length ? foundImages.map((result, i) => (
          <div key={i} className="col-xs-8 col-md-4">
            <a onClick={function(){addFavoriteImage(result);}} className="thumbnail">
              <img src={result.url} />
            </a>
          </div>
      )) : <div className="defaultMessage">Choose filters and/or enter your search above</div>}
      </div>
      {foundImages.length > 0 &&
        <div className="button-line">
          <RaisedButton type="submit" label="More >>" primary className="moreResultsLink" onClick={getMore} />
        </div>
      }
  </Card>
);

SearchResults.propTypes = {
  foundImages: PropTypes.array,
  addFavoriteImage: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired
};

export default SearchResults;