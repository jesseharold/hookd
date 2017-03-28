import React, { PropTypes } from "react";
import { Card, CardText } from 'material-ui/Card';
import SearchForm from "../components/SearchForm.jsx";
import SearchResults from "../components/SearchResults.jsx";
import Favorites from "../components/Favorites.jsx";
import Auth from '../modules/Auth';
import helpers from "../../dist/js/helper";

class SearchPage extends React.Component {
    //class constructor
    constructor(props) {
        super(props);
        // set initial component state
        this.state = {
            errors: {},
            searchTerms: "",
            hiddenTerms: "",
            pageOfResults: 1,
            searchResults: [],
            allTags: [{
                    term:"men", selected:false
                },{
                    term:"women", selected:false
                },{
                    term:"short", selected:false
                },{
                    term:"medium", selected:false
                },{
                    term:"long", selected:false
                },{
                    term:"straight", selected:false
                },{
                    term:"curly", selected:false
                },{
                    term:"beard", selected:false
                },{
                    term:"sleek", selected:false
                },{
                    term:"messy", selected:false
                }
            ],
            favoriteStyles: []
        };
        this.processForm = this.processForm.bind(this);
        this.changeTerms = this.changeTerms.bind(this);
        this.faveHandler = this.faveHandler.bind(this);
        this.chooseTagHandler = this.chooseTagHandler.bind(this);
        this.getMoreResults = this.getMoreResults.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    }

    componentWillMount(){
        var self = this;
        // get user's saved styles from the db
        const savedStyles = helpers.getSavedStyles(Auth.getToken()).then(function(styles){
            if (!styles || !styles.data || styles.status !== 200){
                console.error("something went wrong: ", styles);
            } else {
                //on success, update state
                self.setState({
                    favoriteStyles: styles.data.likedStyles
                });
            }
        });
    }

    changeTerms(event) {
        // set the state to reflect the value of the search text box
        this.setState({
            searchTerms: event.target.value,
            pageOfResults: 1
        });
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create an AJAX request to perform search
        const self = this;
        var query =  this.state.hiddenTerms + this.state.searchTerms;
        helpers.doSearch(Auth.getToken(), query, this.state.pageOfResults).then(function(res){
            if (res && res.status && res.status === 200){
                // on success, update state
                self.setState({
                    searchResults: res.data
                });
            } else {
                console.error("problem with response from search: ", res);
            }
        });
    }

    faveHandler(imageData){
        const self = this;
        // post new saved style to the db
        helpers.createFavorite(Auth.getToken(), imageData).then(function(res){
            // on success, re-render favorites component, using the results
            self.setState({
                favoriteStyles: res.data.likedStyles
            });
        });
    }

    chooseTagHandler(tagText, index){
        // when someone clicks on a search terms tag
        var tagsData = this.state.allTags;
        var newQuery = this.state.hiddenTerms;
        var thisTag = tagsData[index];
        if (thisTag.selected) {
            // this tag is now DEselected, remove from query and remove selected style
            newQuery = newQuery.substring(0, newQuery.indexOf(tagText)) + 
                newQuery.substring(newQuery.indexOf(tagText) + tagText.length);
            thisTag.selected = false;
        }
        else {
            // this tag is now selected, add to query and add selected style
            newQuery += " " + tagText;
            thisTag.selected = true;
        }
        this.setState({
            hiddenTerms: newQuery,
            allTags: tagsData,
            pageOfResults: 1
        });
    }

    getMoreResults(event){
        // when someone clicks on the "more" button after a page of search results
        const nowAt = this.state.pageOfResults + 9;
        this.setState({
            pageOfResults: nowAt,
            searchResults: []
        }, function(){
            this.processForm(event);
        });
    }

    removeFavorite(index){
        var self = this;
        // remove saved style from db
        helpers.destroyFavorite(Auth.getToken(), this.state.favoriteStyles[index]._id).then(function(res){
            // on success, update state
            self.setState({
                favoriteStyles: res.data.likedStyles
            });
        });
    }

    render() {
        return (
            <div className="container wrapAll">
                <Card className="container favesSideBar">
                    <Favorites 
                        faveStyles={this.state.favoriteStyles}
                        removeSaved={this.removeFavorite}
                        />
                </Card>
                <div className="mainBar">
                    <SearchForm
                        onSubmit={this.processForm}
                        onChange={this.changeTerms}
                        searchTerms={this.state.searchTerms}
                        hiddenTerms={this.state.hiddenTerms}
                        chooseTagHandler={this.chooseTagHandler} 
                        allTags={this.state.allTags}
                        />
                    <SearchResults
                        addFavoriteImage={this.faveHandler} 
                        foundImages={this.state.searchResults} 
                        getMore={this.getMoreResults}
                        />
                </div>
            </div>
        );
    }
}


SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;