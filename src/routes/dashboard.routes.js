const { Router } = require('express');
const router = Router();
const { getDashboard, getLastUpdateTime, getListJobs } = require('../controller/dashboard.controller')
router.post('/getDashboard', getDashboard);
router.get('/getLastUpdateTime', getLastUpdateTime);
router.get('/getListJobs', getListJobs);

module.exports = router;