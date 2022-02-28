const { Router } = require('express');
const router = Router();
const {
    getFacturas,
    getDocumentos,
    getTipoDocumentos
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
router.post('/getDocumentos', getDocumentos);
router.get('/getTipoDocumentos', getTipoDocumentos);
module.exports = router;