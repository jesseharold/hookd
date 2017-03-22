const mongoose = require('mongoose');

// define the Style model schema
const StyleSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
});

module.exports = mongoose.model('Style', StyleSchema);