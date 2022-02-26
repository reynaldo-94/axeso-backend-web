const { Router } = require('express');
const router = Router();
const {
    getFacturas
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
module.exports = router;