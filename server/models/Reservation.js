const mongoose = require('mongoose');

// define the Style model schema
const ReservationSchema = new mongoose.Schema({
    
   client : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
   likedStyles : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Style"
  }],
  barber : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  startTime: {
    'dateTime': '2017-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
},
  price : [Number]

});


module.exports = mongoose.model('Reservation', ReservationSchema);