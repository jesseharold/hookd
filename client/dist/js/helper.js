//import Auth from '../../src/modules/Auth';
var axios = require('axios');

function doLogin(formData){
    var authAxios = axios.create({
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    });
    return authAxios.post('/auth/login', formData).then(function(response){
        if (response.status === 200) {
            // put username in localstorage for use by other pages
            localStorage.setItem('userName', response.data.userName);
            return response.data.user;
        } else {
            // failure
            console.error("something went wrong: ", response.errors);
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
        headers: {'Authorization': 'bearer ' + authToken,
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    // create a string for an HTTP body message
    const name = encodeURIComponent(term.name);
    const category = encodeURIComponent(term.category);
    const description = encodeURIComponent(term.description);
    const formData = `name=${name}&category=${category}&description=${description}`;
    return authAxios.post('/api/taxonomy', formData);
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