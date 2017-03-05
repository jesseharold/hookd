const GoogleImages = require('google-images');
const config = require('./config');
 
const client = new GoogleImages(config.googleSearchAPIKey, config.googleCSEId);
 
const searchOptions = {
    page: 1, 
    size:"large"
};

function execute(){
    client.search('hairstyle', searchOptions)
        .then(images => {
            console.log(images[0].url);
            /*
            [{
                "url": "http://steveangello.com/boss.jpg",
                "type": "image/jpeg",
                "width": 1024,
                "height": 768,
                "size": 102451,
                "thumbnail": {
                    "url": "http://steveangello.com/thumbnail.jpg",
                    "width": 512,
                    "height": 512
                }
            }]
            */
        });
}    

module.exports = {
    execute: execute
};