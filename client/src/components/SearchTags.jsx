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
      <h2 className="card-heading">Style Options</h2>
      <ul className="search-results">
      {taxonomy ? taxonomy.map((tag, i) => (
        <button className={tag.selectedClass ? "selected" : "unselected"} key={i} onClick={function(){useTag(tag.name, i);}}>{tag.displayName}</button>
      )) : "No Taxonomy Terms"}
      </ul>
      <form action="/" onSubmit={addTag}>
      <h4 className="card-heading">Add a New Tag</h4>
      <div className="field-line">
        <TextField
          floatingLabelText="Term Name"
          name="name"
          onChange={onChangeTag}
          value={newTermName}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Category"
          name="category"
          onChange={onChangeTag}
          value={newTermCategory}
        />
      </div>
      <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
          onChange={onChangeTag}
          value={newTermDescription}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add Tag" primary />
      </div>
    </form>
  </Card>
);

SearchTags.propTypes = {
  taxonomy: PropTypes.array,
  addTag: PropTypes.func.isRequired,
  useTag: PropTypes.func.isRequired,
  onChangeTag: PropTypes.func.isRequired,
  newTermName: PropTypes.string,
  newTermCategory: PropTypes.string,
  newTermDescription: PropTypes.string,
};

export default SearchTags;