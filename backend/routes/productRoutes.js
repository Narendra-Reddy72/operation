
const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController')

router.post('/post',productController.addProduct)
router.get('/get',productController.getAllProducts);
router.get('/get/:id',productController.getproductById);
router.put('/update/:id',productController.updateProductById);
router.delete('/delete/:id',productController.deleteproductById);

module.exports = router;