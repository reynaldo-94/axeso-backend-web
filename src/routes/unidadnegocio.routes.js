const { Router } = require('express');
const router = Router();
const { getUnidadnegocioSelect } = require('../controller/unidadnegocio.controller')
router.get('/getUnidadnegocioSelect', getUnidadnegocioSelect);
module.exports = router;