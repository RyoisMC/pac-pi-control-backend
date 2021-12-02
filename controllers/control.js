const config = require('../private/config.json');
const apiResponse = require('../services/apiResponse');
var osc = require('node-osc'),
client = new osc.Client(config.X32_IP, config.X32_PORT);
async function set_mode(req, res, next) {
    if(req.body.mode == "ONE") {
        client.send(`/load`, 1, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene 'ONE'"},
            }));
        });
    } else if (req.body.mode == "ONE_PC") {
        client.send(`/load`, 2, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene 'ONE_PC'"},
            }));
        });
    } else if (req.body.mode == "FIVE_PC") {
        client.send(`/load`, 3, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene 'FIVE_PC'"},
            }));
        });
    } else if (req.body.mode == "FULL") {
        client.send(`/load`, 4, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {"status": "ok", "message": "Loaded scene 'FULL'"},
            }));
        });
    } else {
        return res.json(apiResponse({
            error: true,
            message: "Please provide a mode of either 'ONE', 'ONE_PC', 'FIVE_PC', or 'FULL'",
        }));
    }
}
async function power(req, res, next) {
    if(req.body.action == "ON") {
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok", "message": "Sent power on commands"},
        }));
    } else if (req.body.action == "OFF") {
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok", "message": "Sent power off commands"},
        }));
    } else {
        return res.json(apiResponse({
            error: true,
            message: "Please provide an action of either 'ON', or 'OFF'",
        }));
    }
}
module.exports = { set_mode, power };