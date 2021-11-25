const { Router } = require('express');
const router = Router();
const { getProductosSelectProveedor } = require('../controller/producto.controller')
router.post('/getProductosSelectProveedor', getProductosSelectProveedor);
// router.get('/getSublineasSelect', getSublineasSelect);
// router.post('/getSublinea/', getSublinea);
// router.post('/getSublineasSelectLinea/', getSublineasSelectLinea);
module.exports = router;