const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config/private.json');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.error("no auth in headers of request");
    return res.status(401).end();
  }
  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { 
      console.error("error verifying jwt: ", err);
      return res.status(401).end(); 
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }
      // console.log("Auth check middleware found user ", userId);
      req.userid = userId;
      return next();
    });
  });
};