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

function doSearch(authToken, searchterms, offset){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    const query = '/api/search?terms=' + searchterms.trim() + '&page=' + offset;
    //console.log("doing search for " + encodeURI(query));
    return authAxios.get(encodeURI(query));
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

function destroyFavorite(authToken, styleId){
    // make call to api
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.post('/api/favorites/delete', {imageData: styleId});
}

function createAppointment(authToken, styleId){
    // make call to api
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.post('/api/appointment', {style: styleId});
}

function getSavedStyles(authToken){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.get('/api/favorites');
}

function getUserInfo(authToken){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    return authAxios.get('/api/profile');
}

var helpers = {
  doLogin: doLogin,
  doSearch: doSearch,
  getDashboard: getDashboard,
  createFavorite: createFavorite,
  destroyFavorite: destroyFavorite,
  getSavedStyles: getSavedStyles,
  createAppointment: createAppointment,
  getUserInfo: getUserInfo
};

module.exports = helpers;
