const Router = require('express-promise-router');
const router = new Router();

const x32_controller = require('../controllers/x32');

router.put('/api/x32/:ch_type/:ch_number/mute', x32_controller.mute_ch);
router.put('/api/x32/:ch_type/:ch_number/unmute', x32_controller.unmute_ch);
router.get('/api/x32/:ch_type/:ch_number/mute', x32_controller.get_ch_mute);

module.exports = router;