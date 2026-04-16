const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');
const auth = require('../middleware/authMiddleware');

// Public - kirim pesan
router.post('/', ctrl.sendMessage);

// Admin only
router.get('/', auth, ctrl.getAll);
router.patch('/:id/read', auth, ctrl.markRead);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
