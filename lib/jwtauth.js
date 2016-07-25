/**
 * jwtauth
 *
 *  A simple middleware for parsing a JWt token attached to the request. If the token is valid, the corresponding user
 *  will be attached to the request.
 */

var url = require('url')
var UserModel = require('../models/user')
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
	
	// Parse the URL, we might need this
	var parsed_url = url.parse(req.url, true)

	/**
	 * Take the token from:
	 * 
	 *  - the POST value access_token
	 *  - the GET parameter access_token
	 *  - the x-access-token header
	 *    ...in that order.
	 */

	var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

	if (token) {

		try {
			var decoded = jwt.decode(token, app.get('jwtTokenSecret'))

			if (decoded.exp <= Date.now()) {
				res.send('Access token has expired', 400)	
			}

			UserModel.findOne({ '_id': decoded.iss }, function(err, user){

				if (!err) {
					req.user = user		
					return next()
				}

				res.send('Not authorized', 401)
			})

		} catch (err) {			
			res.send('Not authorized', 401)
			// return next()
		}

	} else {
		res.send('Not authorized', 401)
	}
}
