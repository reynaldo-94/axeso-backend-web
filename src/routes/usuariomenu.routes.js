const { Router } = require('express');
const router = Router();
const { getUsuariomenu } = require('../controller/usuariomenu.controller');

router.post('/getUsuariomenu/', getUsuariomenu);
module.exports = router;