const { Router } = require('express');
const router = Router();
const { getMotivobloqueos, getMotivobloqueo } = require('../controller/motivobloqueo.controller')
router.get('/getMotivobloqueos', getMotivobloqueos);
router.get('/getSublineasSelect', getSublineasSelect);
router.post('/getSublinea/', getSublinea);
router.post('/getSublineasSelectLinea/', getSublineasSelectLinea);
module.exports = router;