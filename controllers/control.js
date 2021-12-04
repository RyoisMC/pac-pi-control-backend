const config = require('../private/config.json');
const apiResponse = require('../services/apiResponse');
var osc = require('node-osc');
const redis = require('redis');
const redisclient = redis.createClient()
redisclient.on('error', (err) => console.log('[REDIS ERROR]: ', err));
redisclient.connect();
client = new osc.Client(config.X32_IP, config.X32_PORT);
async function set_mode(req, res, next) {
    if(req.body.mode == "ONE") {
        await redisclient.set('SYS_MODE', 'ONE');
        client.send(`/load`, 1, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene \"ONE\""},
            }));
        });
    } else if (req.body.mode == "ONE_PC") {
        await redisclient.set('SYS_MODE', 'ONE_PC');
        client.send(`/load`, 2, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene \"ONE_PC\""},
            }));
        });
    } else if (req.body.mode == "FOUR_PC") {
        await redisclient.set('SYS_MODE', 'FOUR_PC');
        client.send(`/load`, 3, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene \"FOUR_PC\""},
            }));
        });
    } else if (req.body.mode == "FULL") {
        await redisclient.set('SYS_MODE', 'FULL');
        client.send(`/load`, 4, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene \"FULL\""},
            }));
        });
    } else {
        return res.json(apiResponse({
            error: true,
            message: "Please provide a mode of either \"ONE\", \"ONE_PC\", \"FIVE_PC\", or \"FULL\"",
        }));
    }
}
async function power(req, res, next) {
    if(req.body.action == "ON") {
        await redisclient.set('SYS_PWR', 'ON');
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok", "message": "Sending power on commands"},
        }));
    } else if (req.body.action == "OFF") {
        await redisclient.set('SYS_PWR', 'OFF');
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok", "message": "Sending power off commands"},
        }));
    } else {
        return res.json(apiResponse({
            error: true,
            message: "Please provide an action of either \"ON\", or \"OFF\"",
        }));
    }
}
async function get_cstatus(req, res, next) {
    const power_data = await redisclient.get('SYS_PWR');
    if(power_data == "ON"){
        const control_status = await redisclient.get('SYS_MODE');
        return res.json(apiResponse({
            error: false,
            data: { "power": power_data, "mode": control_status }
        }));
    }else{
        return res.json(apiResponse({
            error: false,
            data: { "power": power_data }
        }));
    }
}
module.exports = { set_mode, power, get_cstatus };