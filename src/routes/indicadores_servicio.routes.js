const { Router } = require('express');
const router = Router();
const { getIndicadoresServicio } = require('../controller/indicadores_servicio.controller')
router.post('/getIndicadoresServicio', getIndicadoresServicio);

module.exports = router;