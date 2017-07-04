var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriversSchema = new Schema({
  name: String,
  points: [],
  total: Number
});

module.exports = mongoose.model('Drivers', DriversSchema);