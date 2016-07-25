/**
 * Load up the project dependencies
 */
var express = require('express')
var colors = require('colors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var url = require('url')
var jwt = require('jwt-simple');

/**
 * Import the model(s)
 */
var UserModel = require('./models/user')

/**
 * THe JWT middleware
 */
var jwtauth = require('./lib/jwtauth')

/**
 * Connect to the database
 */
mongoose.connect('mongodb://localhost/jwttest');


/**
 * Create the express app
 * NOTE: purposely not using var so that app is accesible in modules.
 */
app = express()

/**
 * Set the secret for encoding/decoding JWT tokens
 */
app.set('jwtTokenSecret', 'secret-value')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/**
 * Load up the controllers
 */
var controllers = require('./controllers')
controllers.set(app)

/**
 * Start listening
 */
var server = app.listen(3000, function() {
	console.log('Listening on port %d'.green, server.address().port)
});

/**
 * An example protected route.
 */
app.get('/secret', jwtauth, function(req, res){
	res.send('Hello ' + req.user.username)
})
