const { Router } = require('express');
const router = Router();
const { getDashboard, postJobDashboard } = require('../controller/dashboard.controller')
router.post('/getDashboard', getDashboard);
router.post('/postDashboardInsertar', postJobDashboard);

module.exports = router;