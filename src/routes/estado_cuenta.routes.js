const { Router } = require('express');
const router = Router();
const {
    getFacturas,
    getDocumentos,
    getTipoDocumentos,
    getMotivoReclamos,
    getRubroMotivoReclamos,
    getMonedas,
    getSerieDocumentos,
    getNumeroDocumentos,
    getAmortizacionCuentaPagar
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
router.post('/getDocumentos', getDocumentos);
router.post('/getSerieDocumentos', getSerieDocumentos);
router.post('/getNumeroDocumentos', getNumeroDocumentos);
router.post('/getAmortizacionCuentaPagar', getAmortizacionCuentaPagar);
router.get('/getTipoDocumentos', getTipoDocumentos);
router.get('/getMotivoReclamos', getMotivoReclamos);
router.get('/getRubroMotivoReclamos', getRubroMotivoReclamos);
router.get('/getMonedas', getMonedas);
module.exports = router;