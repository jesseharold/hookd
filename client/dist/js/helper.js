var axios = require('axios');

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

var helpers = {
  doSearch: doSearch,
  getDashboard: getDashboard,
  createFavorite: createFavorite
};

module.exports = helpers;