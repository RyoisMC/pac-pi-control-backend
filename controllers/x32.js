const apiResponse = require('../services/apiResponse');
var osc = require('node-osc'),
client = new osc.Client('10.0.20.35', '10023');
async function mute_ch(req, res, next) {
    client.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 0, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok"},
        }));
    });
}
async function unmute_ch(req, res, next) {
    client.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/on`, 1, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok"},
        }));
    });
}
async function set_fader(req, res, next) {
    client.send(`/${req.params.ch_type}/${req.params.ch_number}/mix/fader`, req.body.fader_pos, (err) => {
        if (err) console.error(err);
        return res.json(apiResponse({
            error: false,
            data: {"status": "ok"},
        }));
    });
}

module.exports = { mute_ch, unmute_ch, set_fader };