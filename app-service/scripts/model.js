var config = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  id: { type: String, index: true },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  username: String,
  fullName: String,
  picture: String,
  accessToken: String
}));

var Group = mongoose.model('Group', new Schema({
  title: { type: String }
, rating: String
, releaseYear: Number
, hasCreditCookie: Boolean
}));

var Circle = mongoose.model('Circle', new Schema({
  id: { type: String, index: true },
  name: { type: String },
  description: String,
  createdBy: String,
  createdOn: Date
}));

module.exports = {
  User: User,
  Group:Group,
  Circle:Circle
}
mongoose.connect(config.db);
