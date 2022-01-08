const { Router } = require('express');
const router = Router();
const {
    getContactosDimexa,
    getContactoDimexaId,
    deleteContactosDimexa,
    InsertToContactoDimexa,
    updateContactoDimexa
} = require('../controller/contacto_dimexa.controller')
router.get('/getContactosDimexa', getContactosDimexa);
router.post('/getContactoDimexaId', getContactoDimexaId);
router.post('/deleteContactosDimexa', deleteContactosDimexa);
router.post('/InsertToContactoDimexa', InsertToContactoDimexa);
router.put('/updateContactoDimexa', updateContactoDimexa);
module.exports = router;