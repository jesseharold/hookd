import React, { PropTypes } from "react";
import SearchForm from "../components/SearchForm.jsx";
import SearchResults from "../components/SearchResults.jsx";
import SearchTags from "../components/SearchTags.jsx";
import Favorites from "../components/Favorites.jsx";
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
            hiddenTerms: "",
            currentOffset: 1,
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
        this.createAppointment = this.createAppointment.bind(this);
    }

    componentWillMount(){
        var self = this;
        const savedStyles = helpers.getSavedStyles(Auth.getToken()).then(function(styles){
            if (!styles || !styles.data || styles.status !== 200){
                console.error("something went wrong: ", styles);
            } else {
                // console.log("got user's styles: ", styles.data.likedStyles); 
                self.setState({
                    favoriteStyles: styles.data.likedStyles
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

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        // create an AJAX request
        const self = this;
        var query = this.state.searchTerms + this.state.hiddenTerms;
        helpers.doSearch(Auth.getToken(), query, this.state.currentOffset).then(function(res){
            if (res && res.status && res.status === 200){
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
        helpers.createFavorite(Auth.getToken(), imageData).then(function(res){
            // console.log("user's updated favorites: ", res.data.likedStyles);
            //re-render favorites component, using the results
            self.setState({
                favoriteStyles: res.data.likedStyles
            });
        });
    }

    chooseTagHandler(tagText, index){
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
            allTags: tagsData
        });
    }

    getMoreResults(event){
        const nowAt = this.state.currentOffset + 10;
        console.log(nowAt);
        this.setState({
            currentOffset: nowAt,
            searchResults: []
        }, function(){
            this.processForm(event);
        });
    }

    removeFavorite(index){
        var self = this;
        helpers.destroyFavorite(Auth.getToken(), this.state.favoriteStyles[index]._id).then(function(res){
            //console.log("done destroying. updated user: ", res.data);
            self.setState({
                favoriteStyles: res.data.likedStyles
            });
        });
    }

    createAppointment(index){
        helpers.createAppointment(Auth.getToken(), this.state.favoriteStyles[index]._id).then(function(res){
            console.log("done creating appointment. updated user: ", res.data);
        });
    }

    render() {
        return (
            <div className="container">
                <h2 className="card-heading">Search for a Hairstyle</h2>
                <SearchTags 
                    useTag={this.chooseTagHandler} 
                    allTags={this.state.allTags}
                    />
                <SearchForm 
                    onSubmit={this.processForm}
                    onChange={this.changeTerms}
                    searchTerms={this.state.searchTerms}
                    hiddenTerms={this.state.hiddenTerms}
                    />
                <SearchResults 
                    addFavoriteImage={this.faveHandler} 
                    foundImages={this.state.searchResults} 
                    getMore={this.getMoreResults}
                    />
                <Favorites 
                    faveStyles={this.state.favoriteStyles}
                    removeSaved={this.removeFavorite}
                    makeAppointment={this.createAppointment}
                    />
            </div>
        );
    }
}


SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SearchPage;