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

var Category = mongoose.model('Category', new Schema({
  id: { type: String, index: true },
  name: { type: String, unique: true},
  description: { type: String},
  createdOn: { type: Date }
}));

module.exports = {
  User: User,
  Category: Category
}
mongoose.connect(config.db);
