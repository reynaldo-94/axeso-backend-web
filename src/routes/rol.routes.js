const { Router } = require('express');
const router = Router();
const { getRoles, getRolesSelect, getRol } = require('../controller/rol.controller')
router.get('/getRoles', getRoles);
router.get('/getRolesSelect', getRolesSelect);
router.post('/getRol/', getRol);
module.exports = router;