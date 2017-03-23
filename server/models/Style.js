const mongoose = require('mongoose');

// define the Style model schema
const StyleSchema = new mongoose.Schema({
  image: String,
  name: String,
  note: String
});

module.exports = mongoose.model('Style', StyleSchema);