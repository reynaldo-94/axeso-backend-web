const { Router } = require('express');
const router = Router();
const { getZonaBySedeSelect } = require('../controller/zona.controller')
router.post('/getZonaBySedeSelect', getZonaBySedeSelect);
module.exports = router;