import React, { PropTypes } from "react";
import SearchForm from "../components/SearchForm.jsx";
import SearchResults from "../components/SearchResults.jsx";
import SearchTags from "../components/SearchTags.jsx";
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
            searchResults: [],
            allTags: [],
            newTag: {
                name: "",
                description: "",
                category: ""
            }
        };
        this.processForm = this.processForm.bind(this);
        this.changeTerms = this.changeTerms.bind(this);
        this.changeNewTagName = this.changeNewTagName.bind(this);
        this.changeNewTagDescription = this.changeNewTagDescription.bind(this);
        this.changeNewTagCategory = this.changeNewTagCategory.bind(this);
        this.newTagHandler = this.newTagHandler.bind(this);
    }

    componentWillMount(){
        var self = this;
        const tags = helpers.getAllTags(Auth.getToken()).then(function(tags){
            // console.log("got tags info");
            if (!tags || !tags.data || tags.status !== 200){
                console.log("something went wrong: ", tags);
            } else {
                var tagArray = [];
                for (var oneTag in tags.data){
                    tagArray.push(oneTag);
                }
                console.log(tagArray[0]);
                self.setState({
                    allTags: tags.data
                });
            }
        });
    }

    changeTerms(event) {
        // set the state to reflect the value of the search text box
        this.setState({
            searchTerms: event.target.value
        });
    }


    ===(event) {
        // set the state to reflect the value of the search text box
            this.setState({
                newTag: {name: event.target.value}
            });
    }
    changeNewTagCategory(event) {
        // set the state to reflect the value of the search text box
            this.setState({
                newTag: {category: event.target.value}
            });
    }
    changeNewTagDescription(event) {
        // set the state to reflect the value of the search text box
            this.setState({
                newTag: {description: event.target.value}
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
        helpers.createFavorite(Auth.getToken(), imageData).then(function(res){
            // console.log("added to favorites ", res);
            // add a class to the selected favorites on the page
        });
    }

    newTagHandler(event){
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        helpers.createTaxTerm(Auth.getToken(), this.state.newTag).then(function(res){
            console.log("added to tags ", res);
        });
    }

    chooseTagHandler(tagData){
        console.log("add " + tagData.name + " to current search query");
    }

    render() {
        return (
            <div>
                <SearchForm 
                    onSubmit={this.processForm}
                    onChange={this.changeTerms}
                    searchTerms={this.state.searchTerms}
                    />
                <SearchResults 
                    addFavoriteImage={this.faveHandler} 
                    foundImages={this.state.searchResults} 
                    />
                <SearchTags 
                    addTag={this.newTagHandler} 
                    useTag={this.chooseTagHandler} 
                    taxonomy={this.state.allTags} 
                    newTermName={this.state.newTag.name}  
                    newTermDescription={this.state.newTag.description}  
                    newTermCategory={this.state.newTag.category} 
                    onChangeName={this.changeNewTagName}
                    onChangeCategory={this.changeNewTagCategory}
                    onChangeDescription={this.changeNewTagDescription}
                    />
            </div>
        );
    }
}


SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;