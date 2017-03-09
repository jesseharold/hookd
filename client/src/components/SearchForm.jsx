import React, { PropTypes } from 'react';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SearchForm = ({
  onSubmit,
  onChange,
  searchTerms,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Search for a Hairstyle</h2>
      <div className="field-line">
        <TextField
          floatingLabelText="Search Terms"
          name="terms"
          onChange={onChange}
          value={searchTerms}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Search" primary />
      </div>
    </form>
  </Card>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchTerms: PropTypes.string.isRequired
};

export default SearchForm;