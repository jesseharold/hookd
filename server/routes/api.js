const express = require('express');
const GoogleImages = require('google-images');
const config = require('../../config');
const models = require('mongoose');
const Style = models.model('Style');
const Taxonomy = models.model('Taxonomy');
const User = models.model('User');

const router = new express.Router();
// since this is in the api routes
// we should get an access to this route only after 
// a successful execution of the authentication checker middleware

router.get('/dashboard', (req, res, next) => {
    if (req.userid){
        // called by the home page, should return
        // the appropriate dashboard data, depending on the role
        res.status(200).json({
            message: "If you can see this message, you are logged in!"
        });
    } else {
        res.status(401).json({
            message: "you are not logged in."
        });
    }

});

router.get("/search", (req, res) => {
  // called by form that searches for styles
  console.log("searching for hairstyle ", req.query.terms);
  const googleClient = new GoogleImages(config.googleCSEId, config.googleSearchAPIKey);
  const searchOptions = {
      page: 1, 
      size:"large"
  };
  googleClient.search("hairstyle " + req.query.terms).then(images => {
    res.send(images);
  }); 
});


router.get("/favorites", (req, response) => {
    // get all styles that have been saved by the current user
    // console.log("userid: ", req.userid);
    User.findById(req.userid).populate("likedStyles").then(function(err, results){
        if (err) { 
            response.send(err); 
        } else {
            response.send(results.likedStyles);
        }
    });
});

router.post("/favorites", (req, res) => {
    // create a new style
    const styleData = {
        image: req.body.imageData.url
    };
    const newStyle = new Style(styleData);
    newStyle.save((err, addedStyle) => {
        if (err) { return done(err); }
        if (!req.userid){
            console.error("could not find logged in user");
        } else {
            // console.log("user exists: ", req.userid);
            // look up current user and add this style to the user's favorites
            User.findById(req.userid).populate("likedStyles").then(function(myuser){
                if (!myuser) { 
                    console.error("error finding that user in db");
                } else {
                    // found user, add new style
                    myuser.likedStyles.push(addedStyle);
                    myuser.save(function(err, updatedUser){
                        if (err){
                            return console.error(err);
                        }
                        // send back updated user to browser
                        res.send(updatedUser);
                    })
                }
            });
        }
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
            response.send(taxonomyArray);
        }
    });
});

router.post("/taxonomy", (req, response) => {
    console.log("creating a new tag term ", req.body);
    // create a new Taxonomy term
    const tagData = {
        name: req.body.name,
        displayName: req.body.displayName ? req.body.displayName : req.body.name,
        description: req.body.description ? req.body.description : "",
        category: req.body.category ? req.body.category : "uncategorized"
    };
    const newTag = new Taxonomy(tagData);
    newTag.save((err) => {
        if (err) { return done(err); }
        response.send("done saving");
    });
});

module.exports = router;