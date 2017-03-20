import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SearchTags = ({
  taxonomy,
  addTag,
  useTag,
  newTermName,
  newTermCategory,
  newTermDescription,
  onChangeTag
}) => (
  <Card className="container">
      <ul className="search-tags">
      {taxonomy ? taxonomy.map((tag, i) => (
        <button className={tag.selectedClass ? "selected" : "unselected"} key={i} onClick={function(){useTag(tag.name, i);}}>{tag.displayName}</button>
      )) : "No Taxonomy Terms"}
      </ul>
  </Card>
);

SearchTags.propTypes = {
  taxonomy: PropTypes.array,
  useTag: PropTypes.func.isRequired
};

export default SearchTags;