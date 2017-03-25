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
    var militaryHour = parseInt(req.body.hour);
    if (req.body.ampm === "PM"){
        if (militaryHour < 12){
            militaryHour += 12;
        }
    } else {
        if (militaryHour === 12){
            militaryHour = 0;
        }
    }

    const startTime = req.body.month + "/" + req.body.day + "/" + req.body.year + ", " + militaryHour + ":00";
    const myReservation = {
        barber: req.body.barber,
        startTime: startTime
    }; 
    if (req.body.chosenStyle !== "none chosen") {
        myReservation.chosenStyle = req.body.chosenStyle;
    }
    const reservation = new Reservation (myReservation);
    reservation.save(function(err, createReservationObject){
        if(err){
            return console.error(err);
        }
        // associate new reservation to logged in user
        User.findById(req.userid).populate("appointments").then(function(myuser){
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

//read reservation
router.get('/', (req, res)=>{
    Reservation.find({}, function(err, reservation){
        if(err){
            res.status(404).send(err)
        }else{
            res.send(reservation);
        }
    });
});

module.exports = router;