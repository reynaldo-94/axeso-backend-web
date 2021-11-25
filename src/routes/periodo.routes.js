const { Router } = require('express');
const router = Router();
const {
    getPeriodos,
    getAnios
} = require('../controller/periodo.controller')
router.post('/getPeriodos', getPeriodos);
router.post('/getAnios', getAnios);
module.exports = router;