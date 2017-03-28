import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SearchTags = ({
  useTag,
  allTags
}) => (
  <div className="container leftMain">
      {allTags.map((tag, i) => (
        <button key={i} className={tag.selected ? "selected tags" : "unselected tags"} onClick={function(){useTag(tag.term, i);}}>{tag.term}</button>
      ))}
  </div>
);

SearchTags.propTypes = {
  allTags: PropTypes.array,
  useTag: PropTypes.func.isRequired
};

export default SearchTags;