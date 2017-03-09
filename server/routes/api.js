const express = require('express');
const GoogleImages = require('google-images');
const config = require('../../config');
 
const router = new express.Router();
// since this is in the api routes
// we should get an access to this route only after 
// a successful execution of the authentication checker middleware

router.get('/dashboard', (req, res) => {
  // called by the home page, should return
  // the appropriate dashboard data, depending on the role
  res.status(200).json({
    message: "If you can see this message, you are logged in!",
    role: "user"
  });
});

router.get("/search", (req, res) => {
  // called by form that searches for styles
  //console.log("searching for ", req.query.terms);
  const client = new GoogleImages(config.googleCSEId, config.googleSearchAPIKey);
  const searchOptions = {
      page: 1, 
      size:"large"
  };
  client.search("hairstyle " + req.query.terms).then(images => {
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

module.exports = router;