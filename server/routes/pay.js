const express = require('express');
const config = require('../../config/index.json');
const pubKey = config.stripe_publishableKey;
const secretKey = config.stripe_secretKey;

const stripe = require("stripe")(secretKey);

const router = new express.Router();

router.post("/charge", (req, res) => {
  console.log("charged :", req.body);
  stripe.customers.create({
     amount: 200,
     email: req.body.email,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.status(200));
});


module.exports = router;
