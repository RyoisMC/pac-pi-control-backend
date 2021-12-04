const apiResponse = require('../services/apiResponse');
const redis = require('../services/redis');
const osc = require('../services/redis');

async function mute_ch(req, res, next) {
    await redis.set(`MUTE_${req.params.ch_type}${req.params.ch_number}`, 'MUTED');
    osc.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 0, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok'},
        }));
    });
}
async function unmute_ch(req, res, next) {
    await redis.set(`MUTE_${req.params.ch_type}${req.params.ch_number}`, 'UNMUTED');
    osc.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 1, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {'status': 'ok'},
        }));
    });
}
async function get_ch_mute(req, res, next) {
    const status = await redis.get(`MUTE_${req.params.ch_type}${req.params.ch_number}`);
    return res.json(apiResponse({
        error: false,
        data: {'status': status },
    }));
}
module.exports = { mute_ch, unmute_ch, get_ch_mute };