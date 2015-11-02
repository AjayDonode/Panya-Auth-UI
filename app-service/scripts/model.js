var config = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  instagramId: { type: String, index: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: String,
  fullName: String,
  picture: String,
  accessToken: String
}));

module.exports = {
  User: User
}
mongoose.connect(config.db);
