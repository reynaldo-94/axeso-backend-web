const { Router } = require('express');
const router = Router();
const {
    getFacturas,
    getDocumentos
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
router.post('/getDocumentos', getDocumentos);
module.exports = router;