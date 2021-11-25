const { Router } = require('express');
const router = Router();
const { getProveedores, getProveedor, getProveedoresSelect } = require('../controller/proveedor.controller')
router.get('/getProveedores', getProveedores);
router.get('/getProveedoresSelect', getProveedoresSelect);
router.get('/getProveedor/:proveedorid', getProveedor);
module.exports = router;