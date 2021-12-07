const { Router } = require('express');
const router = Router();
const { getProductosSelectProveedor, getSelloutProductoMes } = require('../controller/producto.controller')
router.post('/getProductosSelectProveedor', getProductosSelectProveedor);
router.post('/getSelloutProductoMes', getSelloutProductoMes);
module.exports = router;