const { Router } = require('express');
const router = Router();
const {
    getClientes,
    getClientesPage,
    getClientesUbigeoPage,
    getClientesZonaPage,
    getClientesNombrePage,
    getClientesSelect,
    getSelloutClientes,
    getSelloutClientesmes,
    getClientesProveedor
} = require('../controller/cliente.controller')
router.get('/getClientes', getClientes);
router.get('/getClientesSelect', getClientesSelect);
router.post('/getClientesPage', getClientesPage);
router.post('/getClientesUbigeoPage', getClientesUbigeoPage);
router.post('/getClientesZonaPage', getClientesZonaPage);
router.post('/getClientesNombrePage', getClientesNombrePage);
router.post('/getSelloutClientes', getSelloutClientes);
router.post('/getSelloutClientesmes', getSelloutClientesmes);
router.post('/getClientesProveedor', getClientesProveedor);
module.exports = router;