const mongoose = require('mongoose');

// define the Appointment model schema
const AppointmentSchema = new mongoose.Schema({
  requestedStyle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Style"
  },
  startTime: Date,
  duration:  { type: Number, default: 60 },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  paid: { type: Boolean, default: false },
  reviewStars: Number,
  reviewText: String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);