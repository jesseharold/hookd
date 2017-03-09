import React, { PropTypes } from "react";
import SearchForm from "../components/SearchForm.jsx";
import SearchResults from "../components/SearchResults.jsx";
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper"

class SearchPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            searchTerms: "",
            searchResults: []
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
        const self = this;
        helpers.doSearch(Auth.getToken(), this.state.searchTerms).then(function(res){
            if (res && res.status && res.status === 200){
                self.setState({
                    searchResults: res.data
                });
            } else {
                console.log("problem with response from search: ", res);
            }
        });
    }

    faveHandler(imageData){
        console.log("add to favorites ", imageData);
    }
    render() {
        return (
            <div>
                <SearchForm 
                    onSubmit={this.processForm}
                    onChange={this.changeTerms}
                    searchTerms={this.state.searchTerms}
                    />
                <SearchResults addFavoriteImage={this.faveHandler} foundImages={this.state.searchResults} />
            </div>
        );
    }
}


SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;