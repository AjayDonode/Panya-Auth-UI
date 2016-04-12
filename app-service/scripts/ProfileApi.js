module.exports = function(app) {
    'use strict';
    /*GET users Listing*/
    console.log('Service : ProfileService - UP');
    app.post('/api/profiles', function(req,res){
        var now = new Date();
        var profile = new UserProfile({
            "id": req.body.id,
            "name": req.body.name,
            "description": req.body.description,
            "categories": req.body.categories,
            "createdOn": now
        });
        if (req.body._id != null) {
            profile._id = req.body._id;
            profile.update({
                    _id: req.body._id
                }, {
                    $set: {
                        "name": req.body.name,
                        "description": req.body.description,
                        "categories": req.body.categories,
                    }
                },
                function(err) {
                    if (!err) {
                        return console.log("created");
                    } else {
                        profile = {};
                        return console.log(err);
                    }
                }); //set id to use same method for update
        } else {
            profile.save(function(err) {
                if (!err) {
                    return console.log("created");
                } else {
                    return console.log(err);
                    profile = {};
                }
            });
        }

        return res.send(profile);
    });

app.get('/api/profiles', function(req, res) {
    return UserProfile.find(function(err, profiles) {
        if (!err) {
            return res.send(profiles);
        } else {
            return console.log(err);
        }
    });
});

app.delete('/api/profiles/:id', function(req, res) {
    return UserProfile.findById(req.params.id, function(err, profile) {
        console.log(req.params.id + "profile exists " + profile);
        if (profile != null) {
            return profile.remove(profile, function(err) { //TODO Revisit code, There are better ways to remove
                if (!err) {
                    return res.send({
                        "Success": true
                    });
                } else {
                    console.log(err);
                    res.status(err.statusCode || 500).json(err);
                    return res.send("profile not Removed");

                }
            });
        } else {
            res.status(err.statusCode || 400).json(err);
            return res.send("profile not found");
        }
    });
});

}
