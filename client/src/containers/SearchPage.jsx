import React, { PropTypes } from "react";
import SearchForm from "../components/SearchForm.jsx";
import helpers from "../../dist/js/helper"

class SearchPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            searchTerms: ""
        };
        this.processForm = this.processForm.bind(this);
        this.changeTerms = this.changeTerms.bind(this);
    }

    changeTerms(event) {
        // set the state to reflect the value of the search text box
        this.setState({
            searchTerms: event.target.value
        });
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create an AJAX request
        helpers.doSearch(Auth.getToken(), this.state.searchTerms).then(function(err, res){
            console.log("err ", err);
            console.log("res ", res);
        });
    }
    render() {
        return (
            <SearchForm 
                onSubmit={this.processForm}
                onChange={this.changeTerms}
                searchTerms={this.state.searchTerms}
                />
        );
    }
}


SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;