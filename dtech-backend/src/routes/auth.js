const express = require('express');
const router = express.Router();
const { login, getMe, register, changePassword, getAllUsers, deleteUser, updateUser } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', auth, getMe);
router.post('/register', auth, register);
router.put('/change-password', auth, changePassword);
router.get('/users', auth, getAllUsers);
router.delete('/users/:id', auth, deleteUser);
router.put('/users/:id', auth, updateUser);

module.exports = router;
