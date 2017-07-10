var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DriversSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  points: [],
  total: Number
});

module.exports = mongoose.model('Drivers', DriversSchema);