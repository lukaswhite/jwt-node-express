/**
 * Require in the other controllers
 */
var account = require('./account.js')
var auth = require('./auth.js')


module.exports.set = function(app) {
	
	/**
	app.get('/', function(req, res){
	  Website.findByName('bbc', function (err, websites) {
		  res.send(websites.toJSON())
		});
	})
	**/

	// Now set the routes from the other controllers
	account.set(app)
	auth.set(app)

}

