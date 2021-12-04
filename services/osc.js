const osc = require('node-osc');
const config = require('../private/config.json');
client = new osc.Client(config.X32_IP, config.X32_PORT);

module.exports = client;