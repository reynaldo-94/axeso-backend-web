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
    getAmortizacionCuentaPagar,
    getTipoDeudas,
    getDeudaPendienteResumen,
    getDeudaPendienteRubro,
<<<<<<< HEAD
    getDeudaPendienteList,
    getTipoReclamos,
    getRangoDias,
    getLiquidacionDocumentos
=======
    getDeudaPendienteList
>>>>>>> b66d3f4c019b7bf3c724332411f7314b86b05b4f
} = require('../controller/estado_cuenta.controller')
router.post('/getFacturas', getFacturas);
router.post('/getDocumentos', getDocumentos);
router.post('/getSerieDocumentos', getSerieDocumentos);
router.post('/getNumeroDocumentos', getNumeroDocumentos);
router.post('/getAmortizacionCuentaPagar', getAmortizacionCuentaPagar);
router.post('/getDeudaPendienteResumen', getDeudaPendienteResumen);
router.post('/getDeudaPendienteList', getDeudaPendienteList);
router.post('/getDeudaPendienteRubro', getDeudaPendienteRubro);
router.get('/getTipoDocumentos', getTipoDocumentos);
router.get('/getMotivoReclamos', getMotivoReclamos);
router.get('/getRubroMotivoReclamos', getRubroMotivoReclamos);
router.get('/getMonedas', getMonedas);
router.get('/getTipoDeudas', getTipoDeudas);
<<<<<<< HEAD
router.get('/getTipoReclamos', getTipoReclamos);
router.get('/getRangoDias', getRangoDias);
router.post('/getLiquidacionDocumentos', getLiquidacionDocumentos);
=======
>>>>>>> b66d3f4c019b7bf3c724332411f7314b86b05b4f
module.exports = router;