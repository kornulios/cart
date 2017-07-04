var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriversSchema = new Schema({
  name: String,
  points: Number
});

module.exports = mongoose.model('Drivers', DriversSchema);