const express = require('express');
const router = express.Router();
const { login, getMe, register, changePassword } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/register', auth, register);        // superadmin only
router.put('/change-password', auth, changePassword);

module.exports = router;
