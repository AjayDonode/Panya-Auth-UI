var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
//var jwt = require('jwt-simple');
//var moment = require('moment'); //Library used to get date time
//var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var request = require('request');

var app = express();

User = require('./scripts/model').User,



app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./scripts/api')(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});