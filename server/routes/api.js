const express = require('express');
const GoogleImages = require('google-images');
const config = require('../../config/private.json');
const models = require('mongoose');
const Style = models.model('Style');
const User = models.model('User');
//const Appointment = models.model('Appointment');

const router = new express.Router();
// since this is in the api routes
// we should get an access to this route only after
// a successful execution of the authentication checker middleware


router.get("/search", (req, res) => {
  // called by form that searches for styles
  const googleClient = new GoogleImages(config.googleCSEId, config.googleSearchAPIKey);
  const searchOptions = {
      type: "face",
      size: "large",
      safe: "high",
      num: 9,
      page: req.query.offset
  };
  googleClient.search("hairstyle " + req.query.terms, searchOptions).then(images => {
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
router.get("/profile", (req, response) => {
    // get all styles that have been saved by the current user
    // console.log("userid: ", req.userid);
    User.findById(req.userid).populate("likedStyles appointments").exec(function(err, updatedUser){
        if (err) {
            response.send(err);
        } else {
            response.send(updatedUser);
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

router.post("/favorites/delete", (req, res) => {
    // remove a style from logged in user's favorites
    const styleId = req.body.imageData;
    if (!req.userid){
        console.error("could not find logged in user");
    } else {
        // look up current user and remove this style from the user's favorites
        User.findById(req.userid).populate("likedStyles").then(function(myuser){
            if (!myuser) {
                console.error("error finding that user in db");
            } else {
                // found user, remove style
                var i;
                for (i = 0; i < myuser.likedStyles.length; i++){
                    if (myuser.likedStyles[i]._id == styleId){
                        break;
                    }
                }
                myuser.likedStyles.splice(i, 1);
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

module.exports = router;
