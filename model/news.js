var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  author: String,
  title: String,
  text: String
});

module.exports = mongoose.model('News', NewsSchema);