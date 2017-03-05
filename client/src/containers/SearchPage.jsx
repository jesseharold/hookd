import React, { PropTypes } from "react";
import SearchForm from "../components/SearchForm.jsx";

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

        // create a string for an HTTP body message
        const queryString = encodeURIComponent(this.state.searchTerms);
        console.log(queryString);

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/search?terms='+queryString);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success! change the component-container state
                this.setState({
                    errors: {}
                });
                console.log(xhr.response);
                // set a message
                //localStorage.setItem('successMessage', xhr.response.message);

                // make a redirect
                //this.context.router.replace('/login');

            } else {
                // failure
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                this.setState({
                    errors
                });
            }
        });
        xhr.send();
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