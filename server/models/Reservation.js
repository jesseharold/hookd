const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the Style model schema
const ReservationSchema = new Schema({
    
  client : {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
   chosenStyle : {
    type: Schema.Types.ObjectId,
    ref: "Style"
  },
  // save this for when there are barber users in place
  // barber : {
  //   type: Schema.Types.ObjectId,
  //   ref: "User"
  // },  
  barber : String,
  startTime: Date

});


module.exports = mongoose.model('Reservation', ReservationSchema);