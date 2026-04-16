const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/testimoniController');
const auth = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.get('/', ctrl.getAll);

router.post('/', auth, upload.single('photo'), ctrl.create);
router.put('/:id', auth, upload.single('photo'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
