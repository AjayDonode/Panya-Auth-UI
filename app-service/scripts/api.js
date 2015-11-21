module.exports = function(app){
	'use strict';
	var config = require('../config');
	var bcrypt = require('bcryptjs');
	var moment = require('moment'); 
	var jwt = require('jwt-simple');
	var request = require('request');

	/*GET users Listing*/
	console.log('==================================');
	console.log('========: Services are Up :=======');
	console.log('==================================');

	//test Service 
	app.get('/api/test', function(req,res){
  		return res.send("<h4> -:: Ping Ping ::- <br> Its working </h4>");
	});

	app.get('/protected', isAuthenticated, function(req, res) {
  	// Prints currently signed-in user object
	  console.log(req.user);
	});

	app.post('/auth/login', function(req, res) {
	  	User.findOne({ email: req.body.email }, '+password', function(err, user) {
	    if (!user) {
	      return res.status(401).send({ message: { email: 'Incorrect email' } });
	    }

	    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
	      if (!isMatch) {
	        return res.status(401).send({ message: { password: 'Incorrect password' } });
	      }

			      user = user.toObject();
			      delete user.password;

			      var token = createToken(user);
			      res.send({ token: token, user: user });
			    });
			  });
	});

	app.post('/auth/signup', function(req, res) {
	  
	  User.findOne({ email: req.body.email }, function(err, existingUser) {
	    if (existingUser) {
	      return res.status(409).send({ message: 'This EmailId is already taken.' });
	    }

	    var user = new User({
	    	name: req.body.name,
        	lastname: req.body.lastname,
	        email: req.body.email,
	        password: req.body.password,
            age: req.body.age,
            sex: req.body.sex
	    });

	    console.log(req.body.sex+ " Request Object "+User.sex);
	    bcrypt.genSalt(10, function(err, salt) {
	      bcrypt.hash(user.password, salt, function(err, hash) {
	        user.password = hash;

	        user.save(function() {
	          var token = createToken(user);
	          res.send({ token: token, user: user });
	        });
	      });
	    });
	  });
	});


	app.post('/auth/instagram', function(req, res) {
  	var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

	  var params = {
	    client_id: req.body.clientId,
	    redirect_uri: req.body.redirectUri,
	    client_secret: config.clientSecret,
	    code: req.body.code,
	    grant_type: 'authorization_code'
	  };

	  console.log("client_id "+params.client_id);
	   console.log("redirect_uri "+params.redirect_uri);
	    console.log("client_secret "+params.client_secret);
	     console.log("code "+params.code);

  // Step 1\. Exchange authorization code for access token.
  request.post({ url: accessTokenUrl, form: params, json: true }, function(error, response, body) {

    // Step 2a. Link user accounts.
    if (req.headers.authorization) {

      User.findOne({ instagramId: body.user.id }, function(err, existingUser) {

        var token = req.headers.authorization.split(' ')[1];
        var payload = jwt.decode(token, config.tokenSecret);

        User.findById(payload.sub, '+password', function(err, localUser) {
          if (!localUser) {
            return res.status(400).send({ message: 'User not found.' });
          }

          // Merge two accounts.
          if (existingUser) {

            existingUser.email = localUser.email;
            existingUser.password = localUser.password;

            localUser.remove();

            existingUser.save(function() {
              var token = createToken(existingUser);
              return res.send({ token: token, user: existingUser });
            });

          } else {
            // Link current email account with the Instagram profile information.
            localUser.instagramId = body.user.id;
            localUser.username = body.user.username;
            localUser.fullName = body.user.full_name;
            localUser.picture = body.user.profile_picture;
            localUser.accessToken = body.access_token;

            localUser.save(function() {
              var token = createToken(localUser);
              res.send({ token: token, user: localUser });
            });

          }
        });
      });
    } else {
      // Step 2b. Create a new user account or return an existing one.
      User.findOne({ instagramId: body.user.id }, function(err, existingUser) {
        if (existingUser) {
          var token = createToken(existingUser);
          return res.send({ token: token, user: existingUser });
        }

        var user = new User({
          instagramId: body.user.id,
          username: body.user.username,
          fullName: body.user.full_name,
          picture: body.user.profile_picture,
          accessToken: body.access_token
        });

        user.save(function() {
          var token = createToken(user);
          res.send({ token: token, user: user });
        });
      });
    }
  });
});

	//Service to connect google clientID auth
	app.post('/auth/google', function(req, res) {
	console.log("===============================");
	  var accessTokenUrl = 'https://www.googleapis.com/oauth2/v3/token';
	  var params = {
	    client_id: req.body.clientId,
	    redirect_uri: req.body.redirectUri,
	    client_secret: config.clientSecret,
	    code: req.body.code,
	    grant_type: 'authorization_code'
	  };
	 	// Step 1\. Exchange authorization code for access token.
	  request.post({ url: accessTokenUrl, form: params, json: true }, function(error, response, body) {

	    // Step 2a. Link user accounts.
	   /* if (req.headers.authorization) {
	      console.log(params+"======="+body);
	      User.findOne({ instagramId: body.user.id }, function(err, existingUser) {

	        var token = req.headers.authorization.split(' ')[1];
	        var payload = jwt.decode(token, config.tokenSecret);

	        User.findById(payload.sub, '+password', function(err, localUser) {
	          if (!localUser) {
	            return res.status(400).send({ message: 'User not found.' });
	          }

	          // Merge two accounts.
	          if (existingUser) {

	            existingUser.email = localUser.email;
	            existingUser.password = localUser.password;

	            localUser.remove();

	            existingUser.save(function() {
	              var token = createToken(existingUser);
	              return res.send({ token: token, user: existingUser });
	            });

	          } else {
	            // Link current email account with the Instagram profile information.
	            localUser.instagramId = body.user.id;
	            localUser.username = body.user.username;
	            localUser.fullName = body.user.full_name;
	            localUser.picture = body.user.profile_picture;
	            localUser.accessToken = body.access_token;

	            localUser.save(function() {
	              var token = createToken(localUser);
	              res.send({ token: token, user: localUser });
	            });

	          }
	        });
	      });
	    } else {
	      // Step 2b. Create a new user account or return an existing one.
	      User.findOne({ instagramId: body.user.id }, function(err, existingUser) {
	        if (existingUser) {
	          var token = createToken(existingUser);
	          return res.send({ token: token, user: existingUser });
	        }

	        var user = new User({
	          instagramId: body.user.id,
	          username: body.user.username,
	          fullName: body.user.full_name,
	          picture: body.user.profile_picture,
	          accessToken: body.access_token
	        });

	        user.save(function() {
	          var token = createToken(user);
	          res.send({ token: token, user: user });
	        });
	      });
	    } */
	  });
	});
	
	//Restrict unauthorised users from access secure resources
	function isAuthenticated(req, res, next) {
	  if (!(req.headers && req.headers.authorization)) {
	    return res.status(400).send({ message: 'You did not provide a JSON Web Token in the Authorization header.' });
	  }

	  var header = req.headers.authorization.split(' ');
	  var token = header[1];
	  var payload = jwt.decode(token, config.tokenSecret);
	  var now = moment().unix();

	  if (now > payload.exp) {
	    return res.status(401).send({ message: 'Token has expired.' });
	  }

	  User.findById(payload.sub, function(err, user) {
	    if (!user) {
	      return res.status(400).send({ message: 'User no longer exists.' });
	    }
	    req.user = user;
	    next();
	  })
	}

	//Added JWT Token generator
	function createToken(user) {
	  var payload = {
	    exp: moment().add(14, 'days').unix(),
	    iat: moment().unix(),
	    sub: user._id
	  };
	  return jwt.encode(payload, config.tokenSecret);
	}

	

}