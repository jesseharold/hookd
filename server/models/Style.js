const mongoose = require('mongoose');
const Taxonomy = require("./Taxonomy");

// define the Style model schema
const StyleSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
//  tags: [ Taxonomy ]
});

module.exports = mongoose.model('Style', StyleSchema);