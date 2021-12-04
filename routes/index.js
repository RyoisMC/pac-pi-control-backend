const x32 = require('./x32');
const control = require('./control');
const apiResponse = require('../services/apiResponse');
const config = require('../private/config.json');

module.exports = app => {
	app.use(x32);
    app.use(control);
	app.get('/api/heartbeat', function(req, res) {
		res.status(200);
		return res.json(apiResponse({
			error: false,
			data: { 'display_ip': req.headers['x-forwarded-for'] || req.socket.remoteAddress, 'x32_ip': config.X32_IP}
		}));
	});
	app.get('*', function(req, res) {
		res.status(404);
		return res.json(apiResponse({
			error: true,
			message: 'Error 404 Route not found',
		}));
	});
};