const { Router } = require('express');
const router = Router();
const { getProveedores, getProveedor, getProveedoresSelect, getContactoProveedor } = require('../controller/proveedor.controller')
router.get('/getProveedores', getProveedores);
router.get('/getProveedoresSelect', getProveedoresSelect);
router.get('/getProveedor/:proveedorid', getProveedor);
router.get('/getContactoProveedor', getContactoProveedor);
module.exports = router;