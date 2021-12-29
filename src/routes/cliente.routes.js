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
    getClientesProveedor,
    getClienteRuc,
    getClienteRucCodigo,
    getCliente,
    getClienteZonas,
    getClienteSedes,
    getClienteSelloutProducto,
    getClienteSelloutZona,
    getFnClientes,
    getFnClienteCarteras
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
router.post('/getClienteRuc', getClienteRuc);
router.post('/getClienteRucCodigo', getClienteRucCodigo);
router.post('/getCliente', getCliente);
router.post('/getClienteZonas', getClienteZonas);
router.post('/getClienteSedes', getClienteSedes);
router.post('/getClienteSelloutProducto', getClienteSelloutProducto);
router.post('/getClienteSelloutZona', getClienteSelloutZona);
router.post('/getFnClientes', getFnClientes);
router.post('/getFnClienteCarteras', getFnClienteCarteras);

module.exports = router;