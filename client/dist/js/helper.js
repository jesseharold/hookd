//import Auth from '../../src/modules/Auth';
var axios = require('axios');

function doLogin(formData){
    var authAxios = axios.create({
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    });
    return authAxios.post('/auth/login', formData).then(function(response){
        if (response.status === 200) {
            return response.data.user;
        } else {
            // failure
            console.log("something went wrong: ", response.errors);
            return response.errors;
        }
    });
}

function doSearch(authToken, searchterms){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
  return authAxios.get('/api/search?terms=' + searchterms);
}

function getDashboard(authToken){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.get('/api/dashboard');
}

function createFavorite(authToken, image){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.post('/api/favorites', {imageData: image});
}

function createTaxTerm(authToken, term){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.post('/api/taxonomy', {tagData: term});
}

function getAllTags(authToken){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.get('/api/taxonomy');
}

var helpers = {
  doLogin: doLogin,
  doSearch: doSearch,
  getDashboard: getDashboard,
  createFavorite: createFavorite,
  createTaxTerm: createTaxTerm,
  getAllTags: getAllTags
};

module.exports = helpers;