const { Router } = require('express');
const router = Router();
const { getUbigeos, getUbigeo, getDepartamentos, getDepartamentosSelect } = require('../controller/ubigeo.controller')
router.get('/getUbigeos', getUbigeos);
router.get('/getDepartamentos', getDepartamentos);
router.get('/getDepartamentosSelect', getDepartamentosSelect);
router.post('/getUbigeo/', getUbigeo);
module.exports = router;