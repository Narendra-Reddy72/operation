
const express = require('express');
const router = express.Router();

const suppController = require('../controllers/suppController')

router.post('/post',suppController.addsupplies)
router.get('/get',suppController.getAllSupplies);
router.get('/get/:id',suppController.getsuppliesById);
router.put('/update/:id',suppController.updateSuppliesById);
router.delete('/delete/:id', suppController.deletesuppliesById);

module.exports = router;