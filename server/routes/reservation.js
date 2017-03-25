const express = require('express');
const models = require('mongoose');
const Reservation = require('../models/Reservation');
const Style = require('../models/Style');
const User = require('../models/User');

const router = new express.Router();

//create reservation
router.post('/', (req,res)=> {
    // get logged in user's ID and save this appointment
    // create a date object out of data

    const startTime = req.body.month + "/" + req.body.day + "/" + req.body.year + ", " + req.body.hour + req.body.ampm;
    const myReservation = {
        barber: req.body.barber,
        startTime: startTime
    }; 
    var styleId = "";
    if (req.body.chosenStyle !== "none chosen") {
        styleId = req.body.chosenStyle;
    }
    Style.findById(styleId).then(function(thisStyle){
        myReservation.chosenStyle = thisStyle.image;
        const reservation = new Reservation (myReservation);
        reservation.save(function(err, createReservationObject){
            if(err){
                return console.error(err);
            }
            // associate new reservation to logged in user
            User.findById(req.userid).then(function(myuser){
                if (!myuser) {
                    console.error("error finding that user in db");
                } else {
                    // found user, add new style
                    myuser.appointments.push(createReservationObject);
                    myuser.save(function(err, updatedUser){
                        if (err){
                            return console.error(err);
                        }
                        // send back updated user to browser
                        res.send(updatedUser);
                    });
                }
            });
        });
    });
});

//update reservation
router.put('/:reservationId', (req, res)=>{
    Reservation.findById(req.params.reservationId, function(err,reservation){
        if(err){
            res.status(400).send(err);
        }else{
            reservation.chosenStyle = req.body.chosenStyle || reservation.chosenStyle;
            reservation.barber = req.body.barber || reservation.barber;
            reservation.startTime = req.body.startTime || reservation.startTime;
            reservation.paid = req.body.paid || reservation.paid;

            reservation.save(function(err, reservation){
                if(err){
                    res.status(400).send(err)
                }
                res.send(reservation);
            });
        }
    });
});

module.exports = router;