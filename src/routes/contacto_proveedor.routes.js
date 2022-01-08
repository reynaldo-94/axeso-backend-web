const { Router } = require('express');
const router = Router();
const {
    getContactosProveedor,
    getContactoProveedorId,
    getContactosProveedorProvId,
    deleteContactosProveedor,
    InsertToContactoProveedor,
    updateContactoProveedor
} = require('../controller/contacto_proveedor.controller')
router.get('/getContactosProveedor', getContactosProveedor);
router.post('/getContactoProveedorId', getContactoProveedorId);
router.post('/getContactosProveedorProvId', getContactosProveedorProvId);
router.post('/deleteContactosProveedor', deleteContactosProveedor);
router.post('/InsertToContactoProveedor', InsertToContactoProveedor);
router.put('/updateContactoProveedor', updateContactoProveedor);
module.exports = router;