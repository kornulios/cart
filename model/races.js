var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RacesSchema = new Schema({
  name: String,
  date: String,
  results: Object
});

module.exports = mongoose.model('Races', RacesSchema);