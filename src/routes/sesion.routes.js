const { Router } = require('express');
const router = Router();
const { getSesiones, getSesion } = require('../controller/sesion.controller')
router.get('/getSesiones', getSesiones);
router.post('/getSesion', getSesion);
module.exports = router;