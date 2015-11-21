var config = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: { type: String },
  lastname: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  age: { type: Number },
  sex: { type: String }
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
