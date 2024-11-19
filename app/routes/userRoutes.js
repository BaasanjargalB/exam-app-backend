const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/role/:fireId', userController.getUserRole);

module.exports = router;
