const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/teacher/all', userController.getTeachers);
router.post('/register', userController.register);
router.get('/role-status/:fireId', userController.getUserRole);
router.get('/status/:status', userController.getPendingRequests);

module.exports = router;
