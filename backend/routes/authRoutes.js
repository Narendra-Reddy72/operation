
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.post('/add',authController.addUser);
router.post('/login', authController.loginUser)

module.exports = router;