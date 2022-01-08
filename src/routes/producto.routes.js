const { Router } = require('express');
const router = Router();
const {
    getProductosSelectProveedor,
    getSelloutProductoMes,
    getStockProducto,
    getVvencimiento,
    getInventariovencimientoResumen
} = require('../controller/producto.controller')
router.post('/getProductosSelectProveedor', getProductosSelectProveedor);
router.post('/getSelloutProductoMes', getSelloutProductoMes);
router.post('/getStockProducto', getStockProducto);
router.post('/getInventariovencimientoResumen', getInventariovencimientoResumen);
router.get('/getVvencimiento', getVvencimiento);
module.exports = router;