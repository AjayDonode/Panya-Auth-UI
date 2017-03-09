var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var path = require('path');
var app = express();

User = require('./scripts/model').User,
Group = require('./scripts/model').Group,
Circle = require('./scripts/model').Circle,

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./scripts/api')(app);
require('./scripts/userservice')(app);
require('./scripts/circleservice')(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
