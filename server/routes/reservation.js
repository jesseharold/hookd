const express = require('express');
const config = require('../../config');
const models = require('mongoose');
const Reservation = models.model('Reservation');
const Style = models.model('Style');


const router = new express.Router();


//create reservation
router.post('/reservation', (req,res)=> {
    const reservation = {
        client: req.body.reservation.client,
        likedStyles: req.body.reservation.likedStyles ? req.body.reservation.likedStyles 
    }
  const reservation = new Reservation (req.body);
  reservation.save(function(err, createReservationObject){
      if(err){
          res.send(err);
      }
      res.send(createReservationObject);
  })
});
//update reservation
router.put('/reservation', (req, res)=>{
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
router.get('/reservation', (req, res)=>{

    Reservation.find(function(err, reservation){
        if(err){
            res.status(404).send(err)
        }else{
            res.send(reservation);
        }
    })
});