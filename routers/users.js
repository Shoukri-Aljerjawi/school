const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.post('/addUser', userController.addUser);
router.post('/loginUser', userController.loginUser);
router.get('/getUser/:status/:roler', userController.getUsers);
router.put('/userApproved', userController.updateUserByID);
router.delete('/userDelete', userController.deleteUser);
router.put('/updateLastLogin', userController.updateLastLogin);

module.exports = router;
