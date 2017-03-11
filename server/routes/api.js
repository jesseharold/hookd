const express = require('express');
const GoogleImages = require('google-images');
const config = require('../../config');
const models = require('mongoose');
const Style = models.model('Style');
const Taxonomy = models.model('Taxonomy');
//const fs = require('fs');
//const request = require('request');

 
const router = new express.Router();
// since this is in the api routes
// we should get an access to this route only after 
// a successful execution of the authentication checker middleware

router.get('/dashboard', (req, res) => {
    console.log("user: ", req.user);
  // called by the home page, should return
  // the appropriate dashboard data, depending on the role
  res.status(200).json({
    message: "If you can see this message, you are logged in!",
    role: "user"
  });
});

router.get("/search", (req, res) => {
    console.log("user: ", req.user);
  // called by form that searches for styles
  //console.log("searching for ", req.query.terms);
  const googleClient = new GoogleImages(config.googleCSEId, config.googleSearchAPIKey);
  const searchOptions = {
      page: 1, 
      size:"large"
  };
  googleClient.search("hairstyle " + req.query.terms).then(images => {
    res.send(images);
    /* this is what the search results data looks like coming back from the CSE
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
});

router.post("/favorites", (req, res) => {
    //console.log("creating a new style ", req.body);
    // create a new style
    const styleData = {
        image: req.body.imageData.url
    };
    const newStyle = new Style(styleData);
    newStyle.save((err) => {
        if (err) { return done(err); }
        // look up current user and add this style to the user's favorites

        // for future development: actually save this image so link won't become dead
        // var download = function(uri, filename, callback){
        //   request.head(uri, function(err, res, body){
        //     console.log('content-type:', res.headers['content-type']);
        //     console.log('content-length:', res.headers['content-length']);
        //     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        //   });
        // };
        // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
        //   console.log('done');
        // });
        res.send("done saving");
    });
});

router.get("/taxonomy", (req, response) => {
    Taxonomy.find({}).then(function(err, results){
        if (err) { 
            response.send(err); 
        } else {
            let taxonomyArray = [];
            for(var key in results) {
                if(results.hasOwnProperty(key)) {
                    taxonomyArray.push(results[key]);
                }
            }
            console.log(taxonomyArray);
            response.send(taxonomyArray);
        }
    });
});

router.post("/taxonomy", (req, response) => {
    //console.log("creating a new tag term ", req.body);
    // create a new Taxonomy term
    const tagData = {
        name: req.body.tagData.name,
        displayName: req.body.tagData.displayName ? req.body.tagData.displayName : req.body.tagData.name,
        description: req.body.tagData.description ? req.body.tagData.description : "",
        category: req.body.tagData.category ? req.body.tagData.category : "uncategorized"
    };
    const newTag = new Taxonomy(tagData);
    newTag.save((err) => {
        if (err) { return done(err); }
        response.send("done saving");
    });
});

module.exports = router;