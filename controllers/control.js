const apiResponse = require('../services/apiResponse');
const redis = require('../services/redis');
const osc = require('../services/osc');

const X32_INPUTS = ['ch01', 'ch02', 'ch03', 'ch04', 'auxin05'];

async function set_mode(req, res, next) {
    if(req.body.mode == 'ONE') {
        await redis.set('SYS_MODE', 'ONE');
        osc.send(`/load`, 1, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {'status': 'ok', 'message': 'Loaded scene \"ONE\"'},
            }));
        });
    } else if (req.body.mode == 'ONE_PC') {
        await redis.set('SYS_MODE', 'ONE_PC');
        osc.send(`/load`, 2, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {'status': 'ok', 'message': 'Loaded scene \"ONE_PC\"'},
            }));
        });
    } else if (req.body.mode == 'FOUR_PC') {
        await redis.set('SYS_MODE', 'FOUR_PC');
        osc.send(`/load`, 3, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {'status': 'ok', 'message': 'Loaded scene \"FOUR_PC\"'},
            }));
        });
    } else if (req.body.mode == 'FULL') {
        await redis.set('SYS_MODE', 'FULL');
        osc.send(`/load`, 4, (err) => {
            if (err) console.error(err);
            return res.json(apiResponse({
                error: false,
                data: {'status': 'ok', 'message': 'Loaded scene \"FULL\"'},
            }));
        });
    } else {
        return res.json(apiResponse({
            error: true,
            message: 'Please provide a mode of either \"ONE\", \"ONE_PC\", \"FIVE_PC\", or \"FULL\"',
        }));
    }
}
async function power(req, res, next) {
    if(req.body.action == 'ON') {
        await redis.set('SYS_PWR', 'ON');
        X32_INPUTS.forEach(input => {redis.set(`MUTE_${input}`, 'UNMUTED')});
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok', 'message': 'Sending power on commands'},
        }));
    } else if (req.body.action == 'OFF') {
        await redis.set('SYS_PWR', 'OFF');
        X32_INPUTS.forEach(input => {redis.set(`MUTE_${input}`, 'UNMUTED')});
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok', 'message': 'Sending power off commands'},
        }));
    } else {
        return res.json(apiResponse({
            error: true,
            message: 'Please provide an action of either \"ON\", or \"OFF\"',
        }));
    }
}
async function get_cstatus(req, res, next) {
    const power_data = await redis.get('SYS_PWR');
    if(power_data == 'ON'){
        const control_status = await redis.get('SYS_MODE');
        return res.json(apiResponse({
            error: false,
            data: { 'power': power_data, 'mode': control_status }
        }));
    }else{
        return res.json(apiResponse({
            error: false,
            data: { 'power': power_data }
        }));
    }
}
module.exports = { set_mode, power, get_cstatus };