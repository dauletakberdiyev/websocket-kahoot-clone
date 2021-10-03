const router = require('express').Router();
const authController = require('../controllers/authController');

//Register User
router.post('/register', authController.register);

//Login User
router.post('/login', authController.login);

module.exports = router;