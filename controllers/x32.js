const config = require('../private/config.json');
const apiResponse = require('../services/apiResponse');
var osc = require('node-osc');
const redis = require('redis');
const redisclient = redis.createClient()
redisclient.on('error', (err) => console.log('[REDIS ERROR]: ', err));
redisclient.connect();
client = new osc.Client(config.X32_IP, config.X32_PORT);
async function mute_ch(req, res, next) {
    await redisclient.set(`MUTE_${req.params.ch_type}${req.params.ch_number}`, 'MUTED');
    client.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 0, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok'},
        }));
    });
}
async function unmute_ch(req, res, next) {
    await redisclient.set(`MUTE_${req.params.ch_type}${req.params.ch_number}`, 'UNMUTED');
    client.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 1, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok'},
        }));
    });
}
async function get_ch_mute(req, res, next) {
    const status = await redisclient.get(`MUTE_${req.params.ch_type}${req.params.ch_number}`);
    return res.json(apiResponse({
        error: false,
        data: {'status': status },
    }));
}
module.exports = { mute_ch, unmute_ch, get_ch_mute };