const { Router } = require('express');
const router = Router();
const { getLineas, getLineasSelect, getLinea, getLineasProveedor, getLineasProveedorSelect, getLineasUsuarioSelect } = require('../controller/linea.controller')
router.get('/getLineas', getLineas);
router.post('/getLineasUsuarioSelect', getLineasUsuarioSelect);

router.get('/getLineasSelect', getLineasSelect);
router.post('/getLinea/', getLinea);
router.post('/getLineasProveedor/', getLineasProveedor);
router.post('/getLineasProveedorSelect/', getLineasProveedorSelect);
module.exports = router;