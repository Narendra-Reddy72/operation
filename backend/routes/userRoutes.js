
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const {verifyToken,authorizeToken} = require('../middleware/middleware');

router.get('/get',verifyToken,userController.getAllUsers);
router.get('/get/:id',userController.getusersById);
router.put('/update/:id',authorizeToken('user'),userController.updateUserById);
router.delete('/delete/:id',userController.deleteUserById);

module.exports = router;