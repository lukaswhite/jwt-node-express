module.exports.set = function(app) {

	app.get('/account', function(req, res){
	  res.send('This is the web directory account page')
	})

}

