const express = require('express');

const router = new express.Router();
// since this is in the api routes
// we should get an access to this route only after 
// a successful execution of the authentication checker middleware
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "If you can see this message, you are logged in!"
  });
});

module.exports = router;