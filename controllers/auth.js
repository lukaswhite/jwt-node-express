var express = require('express')
var UserModel = require('../models/user')
var jwt = require('jwt-simple');
var moment = require('moment')

module.exports.set = function(app) {

	app.get('/token', function(req, res){ // express.bodyParser() is now deprecated
		
		if (req.headers.username && req.headers.password) {		

		  // Fetch the appropriate user, if they exist
	    UserModel.findOne({ username: req.headers.username }, function(err, user) {

				if (err || user === null) {
					// user cannot be found; may wish to log that fact here. For simplicity, just return a 401
					res.send('Authentication error', 401)
					return
				}

	      user.comparePassword(req.headers.password, function(err, isMatch) {
	      	if (err) {	      		
	      		// an error has occured checking the password. For simplicity, just return a 401
	      		res.send('Authentication error', 401)
	      	}
					if (isMatch) {	

						// Great, user has successfully authenticated, so we can generate and send them a token.	
						var expires = moment().add(7, "days").valueOf()	// format ("days", 7) is deprecaded.
						var token = jwt.encode(
							{
								iss: user.id,
								exp: expires
							}, 
							app.get('jwtTokenSecret')
						);						
						res.json({
							token : token,
							expires : moment(expires).format("DD MMM YYYY hh:mm a"), // Enhace the response
							user : user.toJSON()
						});
					} else {						
						// The password is wrong...
						res.send('Authentication error', 401)
					}
				});

	    });
		} else {
			// No username provided, or invalid POST request. For simplicity, just return a 401
			res.send('Authentication error', 401)
		}
	})

}

