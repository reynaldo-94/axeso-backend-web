const { Router } = require('express');
const router = Router();
const { getProductosSelectProveedor, getSelloutProductoMes, getStockProducto } = require('../controller/producto.controller')
router.post('/getProductosSelectProveedor', getProductosSelectProveedor);
router.post('/getSelloutProductoMes', getSelloutProductoMes);
router.post('/getStockProducto', getStockProducto);
module.exports = router;