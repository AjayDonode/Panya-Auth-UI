var config = require('../config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.model('User', new Schema({
  name: { type: String },
  lastname: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  age: { type: Number },
  sex: { type: String },
  role: { type: Number }
}));

var Category = mongoose.model('Category', new Schema({
  id: { type: String, index: true },
  name: { type: String, unique: true},
  description: { type: String},
  createdOn: { type: Date }
}));

var Gallery = mongoose.model('Gallery', new Schema({
  name: { type: String },
  owner: { type: String },
  approver: { type: String },
  brand: { type: String },
  market: { type: String }  
}));

var UserProfile = mongoose.model('UserProfile', new Schema({
  id: { type: String, index: true },
  name: { type: String, unique: true},
  description: { type: String},
  categories: [Category],
  createdOn: { type: Date }
}));

module.exports = {
  User: User,
  Category: Category,
  UserProfile:UserProfile
}
mongoose.connect("mongodb://panyauser:panyapass@ds011810.mlab.com:11810/panyadbtest");

//mongoose.connect("mongodb://panyauser@localhost/panyadbtest");
