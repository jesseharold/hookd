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
        if (militaryHour !== 12){
            militaryHour += 12;
        }
    } else {
        if (militaryHour === 12){
            militaryHour = 0;
        }
    }
    const startTime = new Date(parseInt(req.body.year), parseInt(req.body.month), parseInt(req.body.day), militaryHour);

    console.log(startTime);

    const myReservation = {
        client: req.userid,
        chosenStyle: req.body.chosenStyle,
        barber: req.body.barber,
        startTime: startTime
    }; 
    const reservation = new Reservation (myReservation);
    reservation.save(function(err, createReservationObject){
        if(err){
            res.send(err);
        }
        res.send(createReservationObject);
    });
});

//update reservation
router.put('/:reservationId', (req, res)=>{
    Reservation.findById(req.params.reservationId, function(err,reservation){
        if(err){
            res.status(400).send(err);
        }else{
            reservation.client = req.body.client || reservation.client;
            reservation.likedStyles = req.body.likedStyles || reservation.likedStyles;
            reservation.barber = req.body.barber || reservation.barber;
            reservation.startTime = req.body.startTime || reservation.startTime;
            reservation.price = req.body.price || reservation.price;

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
    Reservation.find(function(err, reservation){
        if(err){
            res.status(404).send(err)
        }else{
            res.send(reservation);
        }
    });
});

module.exports = router;