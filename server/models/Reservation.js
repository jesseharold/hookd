const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the Style model schema
const ReservationSchema = new Schema({
    
   client : [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
   likedStyles : [{
    type: Schema.Types.ObjectId,
    ref: "Style"
  }],
  barber : [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  startTime: {
    type: Date
},
  price : {
    type: Number
  }

});


module.exports = mongoose.model('Reservation', ReservationSchema);