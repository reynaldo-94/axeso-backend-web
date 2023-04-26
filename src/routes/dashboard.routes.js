const { Router } = require('express');
const router = Router();
const { getDashboard, getLastUpdateTime, getListJobs, getCountSelloutAnterior } = require('../controller/dashboard.controller')
router.post('/getDashboard', getDashboard);
router.get('/getLastUpdateTime/:tipoid', getLastUpdateTime);
router.get('/getListJobs', getListJobs);
router.get('/getCountSelloutAnterior', getCountSelloutAnterior);

module.exports = router;