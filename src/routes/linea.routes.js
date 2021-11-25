const { Router } = require('express');
const router = Router();
const { getLineas, getLineasSelect, getLinea, getLineasProveedor, getLineasProveedorSelect } = require('../controller/linea.controller')
router.get('/getLineas', getLineas);
router.get('/getLineasSelect', getLineasSelect);
router.post('/getLinea/', getLinea);
router.post('/getLineasProveedor/', getLineasProveedor);
router.post('/getLineasProveedorSelect/', getLineasProveedorSelect);
module.exports = router;