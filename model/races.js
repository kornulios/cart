var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RacesSchema = new Schema({
  name: String,
  date: Date,
  time: String,
  location: String,
  signedUp: [{type: String}],
  results: []
});

module.exports = mongoose.model('Races', RacesSchema);