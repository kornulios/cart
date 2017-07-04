var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RacesSchema = new Schema({
  name: String,
  date: String,
  location: String,
  results: []
});

module.exports = mongoose.model('Races', RacesSchema);