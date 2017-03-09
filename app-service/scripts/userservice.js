module.exports = function (app) {
  'use strict';
  var config = require('../config');
  var bcrypt = require('bcryptjs');
  var moment = require('moment');
  var serviceName = "userservice";
  //test Service
  app.get('/' + serviceName + '/test',ensureAuthorized, function (req, res) {
    return res.send("<h4> -:: Ping Ping ::- <br> Its working </h4>");
  });


  app.get('/' + serviceName + '/user', function (req, res) {
    User.find({}, function (err, users) {

      var userMap = {};
      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      res.send(userMap);

    });
  });

  app.post('/' + serviceName + '/group', function (req, res) {
    var group = new Group({
      title: "GroupT",
      rating: "A",
      releaseYear: 2015,
      hasCreditCookie: false

    });

    group.save(function (err, group) {

      if (err) console.log("Error " + err);
      else console.log("Success ");
    });
  });


  app.get('/' + serviceName + '/me', ensureAuthorized, function(req, res) {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0ODUxOTkzNDMsImlhdCI6MTQ4Mzk4OTc0Mywic3ViIjoiNTg2NmJiZDJhNDU4Yjg1NmY1ZDY2MjA0In0.KPh3IxlB95JeXMjOzp1_DkdUCoxeLK24QATWxLeetvE.eyJleHAiOjE0ODUxOTg5NDIsImlhdCI6MTQ4Mzk4OTM0Miwic3ViIjoiNTg2NmJiZDJhNDU4Yjg1NmY1ZDY2MjA0In0.9KSWwL8JSe3uDQEI_5owcVDZHXLyYAaK7oBgny9caXs";
    User.findOne({accessToken: token}, function(err, user) {
      if (err) {
        res.json({
          type: false,
          data: "Error occurred: " + err
        });
      } else {
        res.json({
          type: true,
          data: user
        });
      }
    });
  });


  function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

}
