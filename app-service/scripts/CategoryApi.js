module.exports = function(app){
	'use strict';
	/*GET users Listing*/
	console.log('Service : categories - UP');
	app.put('/api/categories', function(req,res){
	var now = new Date();
	var category = new Category({					
								"id": req.body.id,
								"name" : req.body.name,
								"description" : req.body.description,
								"createdOn" : now
								});
		if(req.body._id!=null)
		{
			category._id = req.body._id;
			category.update(
				{_id:req.body._id},
				{$set : {
						"name" : req.body.name,
						"description" : req.body.description
						}
				}, 
				function (err) {
				if (!err) {
					return console.log("created");
				} else {
					category = {};
					return console.log(err);
				}
			}); //set id to use same method for update
		} else
		{
			category.save(function (err) {
				if (!err) {
				return console.log("created");
				} else {
				return console.log(err);
				category = {};
				}
			});
		}
		
	return res.send(category);
	});

	app.get('/api/categories', function(req,res){
		return Category.find(function (err, categories) {
			if (!err) {
			return res.send(categories);
			} else {
			return console.log(err);
			}
		});
	});

	app.delete('/api/categories/:id', function (req, res){
	  return Category.findById(req.params.id, function (err, category) {
	  	console.log(req.params.id+"category exists "+category);
	  	if(category!=null){
	    return Category.remove(category, function (err) { //TODO Revisit code, There are better ways to remove
	      if (!err) {
	        return res.send({"Success":true});
	      } else {
	        	console.log(err);
	       		 res.status(err.statusCode || 500).json(err);
				return res.send("Category not Removed");
	        
	      }
	    });
		} else {
				res.status(err.statusCode || 400).json(err);
				return res.send("Category not found");
				}
	  });
	});
/*
	app.post('/auth/signin', function(req, res) {
	    AuthUser.findOne({email: req.body.email, password: req.body.password}, function(err, authUser) {
		        if (err) {
		            res.json({
		                type: false,
		                data: "Error occured: " + err
		            });
		        } else {
		            if (authUser) {
		                res.json({
		                    type: false,
		                    data: "User already exists!"
		                });
		            } else {
		                var userModel = new AuthUser();
		                userModel.email = req.body.email;
		                userModel.password = req.body.password;
		                userModel.save(function(err, authUser) {
		                    authUser.token = jwt.sign(authUser, process.env.JWT_SECRET);
		                    authUser.save(function(err, user1) {
		                        res.json({
		                            type: true,
		                            data: user1,
		                            token: user1.token
		                        });
		                    });
		                })
		            }
		        }
		    });
		});
	//get list of all users
	app.get('/api/users', function(req,res){
		return AuthUser.find(function (err, users) {
			if (!err) {
			return res.send(users);
			} else {
			return console.log(err);
			}
		});
	});

	//get user with id
	app.get('/api/users/:id', function(req,res){
		return AuthUser.findById(req.params.id, function (err, user) {
		if (!err) {
			return res.send(user);
		} else {
			return console.log(err);
		}
		});
	});

	//Put User 
	/*app.put('/api/users', function(req,res){
	
	var user = new AuthUser({
					"username" : req.body.username,
					"password" : req.body.password,
					"profession" : req.body.profession,
					"age": req.body.age
				});

	user.save(function (err) {
			if (!err) {
			return console.log("created");
			} else {
			return console.log(err);
			}
		});
	return res.send(user);
	});*/

	//Update User data 
	// app.put('/api/users/:id', function (req, res){
	//   return Usermodel.findById(req.params.id, function (err, user) {
	//     user.username = req.body.username;
	//     user.password = req.body.password;
	//     user.profession = req.body.profession;
	//     user.age = req.body.age;
	//     return user.save(function (err) {
	//       if (!err) {
	//         console.log("updated");
	//       } else {
	//         console.log(err);
	//       }
	      
	//     });
	//   });
	// });

	// //Delete user 
	// app.delete('/api/users/:id', function (req, res){
	//   return AuthUser.findById(req.params.id, function (err, authuser) {
	//   	console.log(req.params.id+"user found "+authuser);
	//   	if(authuser!=null){
	//     return AuthUser.remove(authuser, function (err) { //TODO Revisit code, There are better ways to remove
	//     	console.log("Delete Called"+err);
	//       if (!err) {
	//         console.log("removed");
	//         return res.send(true);
	//       } else {
	//         console.log(err);
	//         return res.send(false);
	//       }
	//     });
	// 	} else {return res.send("User not found");}
	//   });
	// });

	// app.post('/api/login', function(req,res){
	// 	return Usermodel.find({ "username": req.body.username , "password": req.body.password }, function (err, user) {
	// 			if (!err) {
	// 			console.log(user);
 //                 console.log("Found User with Name ");
 //              } else {
 //              		console.log("Error : "+ err);
 //              }
 //              return res.send(user);
	// 	}); 
	// });

}