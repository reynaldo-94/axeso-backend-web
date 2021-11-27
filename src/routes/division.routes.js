const { Router } = require('express');
const router = Router();
const { getDivisionSelect } = require('../controller/division.controller')
router.get('/getDivisionSelect', getDivisionSelect);
module.exports = router;