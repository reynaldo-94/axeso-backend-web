const { Router } = require('express');
const router = Router();
const {
    getUsuarios,
    getUsuario,
    loginUsuario,
    createUsuario,
    updateUsuario,
    updateEstadoUsuario,
    checkUsuario,
    checkEmail,
    logoutUsuario,
    blockUsuario,
    updateClaveUsuario,
    updateClaveEmail
} = require('../controller/usuario.controller')
router.get('/getUsuarios', getUsuarios);
router.post('/getUsuario/', getUsuario);
router.post('/loginUsuario/', loginUsuario);
router.post('/checkUsuario/', checkUsuario);
router.post('/checkEmail/', checkEmail);
router.post('/createUsuario/', createUsuario);
router.put('/updateUsuario/', updateUsuario);
router.put('/updateEstadoUsuario/', updateEstadoUsuario);
router.put('/updateEstadoUsuario/', updateEstadoUsuario);
router.put('/logoutUsuario/', logoutUsuario);
router.put('/blockUsuario/', blockUsuario);
router.put('/updateClaveUsuario/', updateClaveUsuario);
router.put('/updateClaveEmail/', updateClaveEmail);
module.exports = router;