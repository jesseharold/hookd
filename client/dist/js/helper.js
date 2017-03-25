//import Auth from '../../src/modules/Auth';
var axios = require('axios');

function doLogin(formData){
    var authAxios = axios.create({
        headers: {'Content-type': 'application/x-www-form-urlencoded'}
    });
    return authAxios.post('/auth/login', formData);
}

function doSearch(authToken, searchterms, offset){
    // set header to do authorization in passport
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    const query = '/api/search?terms=' + searchterms.trim() + '&offset=' + offset;
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

function createAppointment(authToken, appointmentData){
    // make call to api
    var authAxios = axios.create({
        headers: {'Authorization': 'bearer ' + authToken}
    });
    console.log("do booking ", appointmentData);
    return authAxios.post('/reservations/', appointmentData);
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
