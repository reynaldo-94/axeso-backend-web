const { Router } = require('express');
const router = Router();
const { getAlmacen, getAlmacenes, getAlmacenesSelect, getAlmacenUnidadNegocio, getAlmacenUnidadNegocioSelect } = require('../controller/almacen.controller')
router.get('/getAlmacenes', getAlmacenes);
router.get('/getAlmacenesSelect', getAlmacenesSelect);
router.post('/getAlmacen/', getAlmacen);
router.post('/getAlmacenUnidadNegocio/', getAlmacenUnidadNegocio);
router.post('/getAlmacenUnidadNegocioSelect/', getAlmacenUnidadNegocioSelect);

module.exports = router;