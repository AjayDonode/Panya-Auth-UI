var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');

//var jwt = require('jwt-simple');
//var moment = require('moment'); //Library used to get date time
//var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

var app = express();

var corsOptions = {
	origin: 'http://localhost:9000',
	credentials: true
};

User = require('./scripts/model').User;
Category = require('./scripts/model').Category;

app.set('port', process.env.PORT || 3000);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Production Settings
 */
if (app.get('env') === 'production') {

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '/dist')));

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

require('./scripts/api')(app);
require('./scripts/CategoryApi')(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});


module.exports = app;