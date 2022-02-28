const { Router } = require('express');
const router = Router();
const {
    getFacturas,
    getDocumentos,
    getTipoDocumentos,
    getMotivoReclamos
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
router.post('/getDocumentos', getDocumentos);
router.get('/getTipoDocumentos', getTipoDocumentos);
router.get('/getMotivoReclamos', getMotivoReclamos);
module.exports = router;