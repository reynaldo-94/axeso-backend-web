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
    getClienteSelloutDescarga,
    getClienteSelloutZona,
    getFnClientes,
    getFnClienteCarteras,
    getFacturas,
    getInsertarAlmacen
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
router.post('/getClienteSelloutDescarga', getClienteSelloutDescarga);
router.post('/getClienteSelloutZona', getClienteSelloutZona);
router.post('/getFnClientes', getFnClientes);
router.post('/getFnClienteCarteras', getFnClienteCarteras);
router.get('/getInsertarAlmacen', getInsertarAlmacen);

module.exports = router;