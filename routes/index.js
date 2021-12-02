const x32 = require('./x32');
const control = require('./control');
const apiResponse = require('../services/apiResponse');


module.exports = app => {
	app.use(x32);
    app.use(control);
	app.get('*', function(req, res) {
		res.status(404);
		return res.json(apiResponse({
			error: true,
			message: 'Error 404 Route not found',
		}));
	});
};