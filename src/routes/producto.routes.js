const { Router } = require('express');
const router = Router();
const {
    getProductosSelectProveedor,
    getSelloutProductoMes,
    getStockProducto,
    getVvencimiento,
    getInventariovencimientoResumen,
    getInventariovencimiento,
    getStockProductoDescarga,
    getInventarioCritico
} = require('../controller/producto.controller')
router.post('/getProductosSelectProveedor', getProductosSelectProveedor);
router.post('/getSelloutProductoMes', getSelloutProductoMes);
router.post('/getStockProducto', getStockProducto);
router.post('/getInventariovencimientoResumen', getInventariovencimientoResumen);
router.post('/getInventariovencimiento', getInventariovencimiento);
router.post('/getStockProductoDescarga', getStockProductoDescarga);
router.get('/getVvencimiento', getVvencimiento);
router.post('/getInventarioCritico', getInventarioCritico);
module.exports = router;