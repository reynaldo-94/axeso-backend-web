const { Router } = require('express');
const router = Router();
const { getTipousuarios, getTipousuariosSelect } = require('../controller/tipousuario.controller')
router.get('/getTipousuarios', getTipousuarios);
router.get('/getTipousuariosSelect', getTipousuariosSelect);
module.exports = router;