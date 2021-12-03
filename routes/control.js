const Router = require('express-promise-router');
const router = new Router();

const ctrl_controlller = require('../controllers/control');

router.get('/api/control/status', ctrl_controlller.get_cstatus);
router.post('/api/control/mode', ctrl_controlller.set_mode);
router.post('/api/control/power', ctrl_controlller.power);
module.exports = router;