const express = require('express');
const router = express.Router();
const { register, login, getMe, logout, verifyToken } = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', auth, verifyToken);
router.get('/me', auth, getMe);
router.post('/logout', auth, logout);

module.exports = router;
