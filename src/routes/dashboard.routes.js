const { Router } = require('express');
const router = Router();
const { getDashboard, getLastUpdateTime } = require('../controller/dashboard.controller')
router.post('/getDashboard', getDashboard);
router.get('/getLastUpdateTime', getLastUpdateTime);

module.exports = router;