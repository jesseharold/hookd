var axios = require('axios');

function doSearch(authToken, searchterms){
    //console.log("submitting search");
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
  return authAxios.get('/api/search?terms=' + searchterms);
}

function getDashboard(authToken){
    //console.log("getting dashboard");
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.get('/api/dashboard');
}

var helpers = {
  doSearch: doSearch,
  getDashboard: getDashboard
};

module.exports = helpers;