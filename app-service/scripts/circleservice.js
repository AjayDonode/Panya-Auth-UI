module.exports = function (app) {
  'use strict';
  var config = require('../config');
  var moment = require('moment');
  var serviceName = "circleservice";


  app.get('/' + serviceName + '/circle', function(req, res) {
    Circle.find(function(err, circles) {
      if (err){
        console.log("Error "+err);
        res.status(404);
        res.json({ "Error" : "No Circles found" })
      }
      res.json(circles);
    });
  });

  app.post('/' + serviceName + '/circle', function (req, res) {
    var inCircle = req.body;
    Circle.findOne({ email: inCircle.name }, function(err, existingCircle) {
      if (existingCircle) {
        return res.status(409).send({ message: 'Circle is already exist.' });
      }

      var circle = new Circle({
        name: inCircle.name,
        description: inCircle.description,
        createdBy: inCircle.createdBy,
        createdOn: inCircle.createdOn
      });

      circle.save(function() {
        res.send({ result: "Success", circle: circle });
      });
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
