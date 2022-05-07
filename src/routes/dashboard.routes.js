const { Router } = require('express');
const router = Router();
const { getDashboard } = require('../controller/dashboard.controller')
router.post('/getDashboard', getDashboard);

module.exports = router;