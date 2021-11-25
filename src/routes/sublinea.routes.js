const { Router } = require('express');
const router = Router();
const { getSublineas, getSublinea, getSublineasSelect, getSublineasSelectLinea } = require('../controller/sublinea.controller')
router.get('/getsublineas', getSublineas);
router.get('/getSublineasSelect', getSublineasSelect);
router.post('/getSublinea/', getSublinea);
router.post('/getSublineasSelectLinea/', getSublineasSelectLinea);
module.exports = router;