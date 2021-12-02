const Router = require('express-promise-router');
const router = new Router();

const ctrl_controlller = require('../controllers/control');

router.post('/api/control/mode', ctrl_controlller.set_mode);
module.exports = router;