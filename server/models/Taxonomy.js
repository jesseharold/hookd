const mongoose = require('mongoose');

// define the Style model schema
const TaxonomySchema = new mongoose.Schema({
  name: String,
  displayName: String,
  description: String,
  category: String
});

module.exports = mongoose.model('Taxonomy', TaxonomySchema);