const { Router } = require('express');
const router = Router();
const {
    getMenus,
    getMenu
} = require('../controller/menu.controller')
router.get('/getMenus', getMenus);
router.get('/getMenu', getMenu);
module.exports = router;