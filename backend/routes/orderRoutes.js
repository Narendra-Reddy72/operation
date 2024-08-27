const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/add', orderController.addOrder);
router.get('/get', orderController.getAllOrders);
router.get('/get/:id', orderController.getOrderById);
router.put('/update/:id', orderController.updateOrderById);
router.delete('/delete/:id', orderController.deleteOrderById);
module.exports = router;
